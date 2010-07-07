var fs = require('fs'),
sys = require('sys'),
_ = require('../vendor/underscore')._;

function sandbox(data) {

  // play'n in the sand

}

function run() {
  fs.readFile('data/errors.json', function (err, data) {
    if (err) throw err;
    var json = eval('(' + data + ')');
    sandbox(json);
  });
}

run();
