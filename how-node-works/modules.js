console.log(arguments);
console.log(require("module").wrapper);

const EvilTree = require("./test-module-a");
const calcA = new EvilTree();
const funcs = require("./test-mod-b");
console.log(calcA.multiply(333, 2));
console.log(funcs.kill("myself"));

// caching
require("./test-mod-c")();
require("./test-mod-c")();
require("./test-mod-c")();
require("./test-mod-c")();
