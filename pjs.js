#!/usr/bin/env node
var fs = require('fs');

function createSpaces(amount) {
  var spaces = "";
  for (var i = 0 ; i < amount ; i ++) {
    spaces += "\t";
  }
  return spaces;
}

function convertFile(err, contents) {
  var lines = contents.split("\n");
  var expectedIndent = 0;
  var inLineContinuation = false;
  var firstChar = "";
  for (var i = 0 ; i < lines.length; i++) {
    var currentLine = lines[i];
    var spaces = 0;
    var found_spaces = 0;
    var firstCharPos = 0;
    for (var k = 0 ; k < currentLine.length ; k++) {
      var nextChar = currentLine.charAt(k);
      if (nextChar == ' ') { found_spaces++; }
      else if (nextChar == "\t") { spaces++; }
      else { firstCharPos = k; firstChar = nextChar; break; }
    }
    spaces = spaces + (found_spaces / Number(process.argv[3] || 4));
    // console.log(spaces);
    // begin a block
    var blockBegin = currentLine.lastIndexOf(":");
    if (blockBegin != -1 && blockBegin == currentLine.length - 1) {
      if (spaces == expectedIndent -1) {
        console.log(createSpaces(expectedIndent - 1) + "}");
        expectedIndent--;
      }
      console.log(currentLine.substring(0, currentLine.length - 1) + " {");
      expectedIndent++;

    } else if (spaces == 0 && expectedIndent > 0) {
      for (var j = expectedIndent ; j > 0 ; j--) {
        console.log(createSpaces(j - 1) + "}");
      }
      expectedIndent = 0;
    } else if (spaces < expectedIndent) {
      console.log(createSpaces(spaces) + "}");
      expectedIndent--;
      console.log(currentLine + ";");
  } else if (currentLine.length > 0 && lines[i+1].charAt(firstCharPos) != "+") {
      console.log(currentLine + ";");
    } else {
      console.log(currentLine);
    }


  }
}

fs.readFile(process.argv[2], 'utf8', convertFile);
