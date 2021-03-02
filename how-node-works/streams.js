const fs = require("fs");
const server = require("http").createServer();

server.on("request", (req, res) => {
  // Solution 1
  //   fs.readFile("text-file.txt", (err, data) => {
  //     if (err) console.log(err);
  //     res.end(data);
  //   });

  // Solution 2
  //   const readableStream = fs.createReadStream("texft-file.txt");
  //   readableStream.on("data", (chunk) => {
  //     res.write(chunk);
  //   });
  //   readableStream.on("end", () => {
  //     res.end();
  //   });
  //   readableStream.on("error", (err) => {
  //     console.log(err);
  //     res.statusCode = 500;
  //     res.end("File Not Found");
  //   });

  // Solution 3
  const readableStream = fs.createReadStream("text-file.txt");
  readableStream.pipe(res);
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Listening on port 8000");
});
