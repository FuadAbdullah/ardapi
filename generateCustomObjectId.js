function generateCustomObjectId() {
  const timestamp = Math.floor(Date.now() / 1000).toString(16);
  const machineId = Math.floor(Math.random() * 16777215).toString(16);
  const processId = process.pid.toString(16);
  const randomIncrement = Math.floor(Math.random() * 16777215).toString(16);

  // Ensure each part has a fixed length
  const objectId = (
    timestamp.padStart(8, "0") +
    machineId.padStart(6, "0") +
    processId.padStart(4, "0") +
    randomIncrement.padStart(6, "0")
  ).toLowerCase();

  return objectId;
}

module.exports = generateCustomObjectId;
