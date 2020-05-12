var fileLines = [ /* {"text": 'line of text'}, {"text": 'another line of text'} */ ];

function processFile(inputFile) {

  var fs = require('fs');
  var readline = require('readline');
  var instream = fs.createReadStream(inputFile);
  var outstream = new (require('stream'))();
  var rl = readline.createInterface(instream, outstream);

    // when you get a line, do this 
    rl.on('line', function (line) {
      // Remove Non-ASCII Characters 
      line = line.replace(/[^A-Za-z 0-9 \.,\?""!@#\$%\^&\*\(\)-_=\+;:<>\/\\\|\}\{\[\]`~]*/g, '');
      if (line.length == 0) {
        return;
      } else {
        fileLines.push({ "lineNumber": 1, "text": line});
      }
    });

    // when there are no more lines do this
    rl.on('close', function (line) {
      //console.log(line);
    });
}

// WRITE ARRAY TO FILE
function writeToFile() {
  console.log("writing()...");
  var fs = require('fs');
  
  fs.appendFile('./output.txt', "Start of file before loop." + '\n', function (err) {
    if (err) throw err;
  });

  for (var i = 0; i < fileLines.length; i++) {
    var lineString = null;
    lineString = fileLines[i].text;
    fs.appendFile('./output.txt', lineString + '\n', function (err) {
      if (err) throw err;
    });
  };

  console.log("Done wrting.");
}

// *******************************************************
// Attempt to write array of objects to file with Promise
// *******************************************************

//processFile('./handHistory.txt');
var fs = require('fs');
fs.readdir('./filesToProcess', (err, files) => {
  for (var i = 0; i < files.length; i++) {
    //console.log("run the process on : " + files[i]);
    console.log("Processing: " + files[i] + "\n");
    processFile('./filesToProcess/' + files[i]);
  };
});

// Without this writeToFile gets called sometimes
// before processFiles is finished
// This is the problem we are trying to solve with promises
//setTimeout(writeToFile, 1000);

