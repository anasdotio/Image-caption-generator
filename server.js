const { config } = require("dotenv");
config();
const http = require("http");
const app = require("./src/app.js");
const connectToDB = require("./src/db/db.js");

const server = http.createServer(app);
const PORT = process.env.PORT || 3000;

connectToDB();
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
