const { execSync } = require("child_process");
const fs = require("fs");
const { variables } = require("./var");

const init = () => {
  // Run the command to get the container ID
  const dockerid = execSync(
    "cat /proc/self/mountinfo | grep '/var/lib/docker/containers/' | sed -n 's/.*\\/var\\/lib\\/docker\\/containers\\/\\([a-f0-9]\\+\\)\\/.*/\\1/p;q'",
    { encoding: "utf-8" }
  ).trim();

  // Load Muse album and song track db
  const museAlbum = JSON.parse(fs.readFileSync("muse.json", "utf-8"));
  const randomAlbum = Math.floor(Math.random() * museAlbum.album.length);
  const randomSong = Math.floor(
    Math.random() * museAlbum.album[randomAlbum].songs.length
  );

  // Docker container id string
  const dockeridRegex = /^[a-f0-9]{64}$/;
  // Check if the containerId is not empty and matches the regex
  if (!dockerid || !dockeridRegex.test(dockerid)) {
    console.error(
      "[ERROR] Container ID is not valid, assuming the server is not containerized..."
    );

    // Generate the server's name following Muse's song title-random string format
    return (variables["containerId"] = Object.keys(
      museAlbum.album[randomAlbum].songs[randomSong]
    ).includes("shorthand")
      ? `${
          museAlbum.album[randomAlbum].songs[randomSong].shorthand
        }-${require("./generateCustomObjectId")()}`
      : `${
          museAlbum.album[randomAlbum].songs[randomSong].title
        }-${require("./generateCustomObjectId")()}`);
  }

  // Generate the container name following Muse's song title-dockerid format
  return (variables["containerId"] = Object.keys(
    museAlbum.album[randomAlbum].songs[randomSong]
  ).includes("shorthand")
    ? `${museAlbum.album[randomAlbum].songs[randomSong].shorthand}-${dockerid}`
    : `${museAlbum.album[randomAlbum].songs[randomSong].title}-${dockerid}`);
};

module.exports = init;
