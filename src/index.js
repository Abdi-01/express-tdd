const { join } = require("path");
require("dotenv").config({ path: join(__dirname, "../.env") });
const PORT = 4000;
const server = require("./server.js");
server.listen(PORT, (err) => {
  if (err) {
    console.log(`ERROR: ${err}`);
  } else {
    console.log(`APP RUNNING at ${PORT} ✅`);
  }
});
