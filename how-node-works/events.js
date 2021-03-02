const EventEmitter = require("events");
const http = require("http");

class Deaths extends EventEmitter {
  constructor() {
    super();
  }
}

const myEmitter = new Deaths();

myEmitter.on("newDeath", () => {
  console.log("There was a new death");
});

myEmitter.on("newDeath", () => {
  console.log("The death was brutal");
});

myEmitter.on("newDeath", (t) => {
  console.log(`There is now a total of ${t} deaths`);
});

myEmitter.emit("newDeath", 7);

const server = http.createServer();

server.on("request", (req, res) => {
  console.log("Request recieved");
  res.end("Hahaha a request??");
});
server.on("request", (req, res) => {
  console.log("Request 2 recieved");
});
server.on("close", () => {
  console.log("All has ended");
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Waiting forever");
});
