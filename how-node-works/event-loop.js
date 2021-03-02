const fs = require("fs");
const crypto = require("crypto");

const start = Date.now();
process.env.UV_THREADPOOL_SIZE = 1;

setTimeout(() => console.log("T1"), 0);

setImmediate(() => console.log("Immediate finished 2"));

fs.readFile("/text-file.txt", () => {
  console.log("I/0 Finished 3");

  setTimeout(() => console.log("T2"), 0);
  setTimeout(() => console.log("T3"), 4000);
  setImmediate(() => console.log("I 2 finished"));

  process.nextTick(() => console.log("Nexttick"));

  crypto.pbkdf2("murder", "salt", 100000, 1024, "sha512", () => {
    console.log(Date.now() - start, "Password encrypted");
  });
  crypto.pbkdf2("murder", "salt", 100000, 1024, "sha512", () => {
    console.log(Date.now() - start, "Password encrypted");
  });
  crypto.pbkdf2("murder", "salt", 100000, 1024, "sha512", () => {
    console.log(Date.now() - start, "Password encrypted");
  });
  crypto.pbkdf2("murder", "salt", 100000, 1024, "sha512", () => {
    console.log(Date.now() - start, "Password encrypted");
  });
  crypto.pbkdf2("murder", "salt", 100000, 1024, "sha512", () => {
    console.log(Date.now() - start, "Password encrypted");
  });
  crypto.pbkdf2("murder", "salt", 100000, 1024, "sha512", () => {
    console.log(Date.now() - start, "Password encrypted");
  });
  crypto.pbkdf2("murder", "salt", 100000, 1024, "sha512", () => {
    console.log(Date.now() - start, "Password encrypted");
  });
  crypto.pbkdf2("murder", "salt", 100000, 1024, "sha512", () => {
    console.log(Date.now() - start, "Password encrypted");
  });
  crypto.pbkdf2("murder", "salt", 100000, 1024, "sha512", () => {
    console.log(Date.now() - start, "Password encrypted");
  });
  crypto.pbkdf2("murder", "salt", 100000, 1024, "sha512", () => {
    console.log(Date.now() - start, "Password encrypted");
  });
  crypto.pbkdf2("murder", "salt", 100000, 1024, "sha512", () => {
    console.log(Date.now() - start, "Password encrypted");
  });
});

console.log("I am above 4");
