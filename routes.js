const Router = require("koa-router");
const router = new Router();
const fs = require("fs");
const baseUrl = process.env.ARDAPI_BASE_URL || "/ardapi/v1";
const { variables } = require("./var");

// Return list of available endpoints to call
router.get(`${baseUrl}`, (ctx) => {
  const endpointData = JSON.parse(
    fs.readFileSync("endpointDesc.json", "utf-8")
  );
  ctx.body = endpointData;
});

// Return health status of the api server
router.get(`${baseUrl}/health`, (ctx) => {
  ctx.body = { status: "OK" };
});

// Return instance info
router.get(`${baseUrl}/info`, (ctx) => {
  ctx.body = {
    name: variables.containerId,
    desc: `Your request was handled by ${variables.containerId}.`,
  };
});

// Get random quotes
router.get(`${baseUrl}/quotes`, (ctx) => {
  const quotesData = JSON.parse(fs.readFileSync("db.json", "utf-8"));

  const randomIndex = Math.floor(Math.random() * quotesData.quotes.length);
  const randomQuote = quotesData.quotes[randomIndex];
  ctx.body = { quote: randomQuote.quote };
});

// Get random color hex
router.get(`${baseUrl}/color`, (ctx) => {
  ctx.body = { color: "#" + Math.floor(Math.random() * 16777215).toString(16) };
});

// Get random number from given range
router.get(`${baseUrl}/range/:start/:end`, (ctx) => {
  const start = parseInt(ctx.params.start);
  const end = parseInt(ctx.params.end);
  const randomNum = Math.floor(Math.random() * (end - start + 1) + start);
  ctx.body = { number: randomNum };
});

// Return Muse's albums and track lists
router.get(`${baseUrl}/muse`, (ctx) => {
  const museAlbum = JSON.parse(
    fs.readFileSync("muse.json", "utf-8")
  );
  ctx.body = museAlbum;
});

module.exports = router;
