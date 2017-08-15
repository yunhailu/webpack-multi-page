var minimist = require('minimist');

var args = minimist(process.argv.slice(2));

console.log(args.v1);

// node test.js --v1 hello