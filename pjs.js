#!/usr/bin/env node
var fs = require('fs');

function createSpaces(amount) {
  var spaces = "";
  for (var i = 0 ; i < amount ; i ++) {
    spaces += "    ";
  }
  return spaces;
}

function scanNextLineFirstChar(line) {
    var firstChar = "";
    for (var k = 0 ; k < line.length ; k++) {
      var nextChar = line.charAt(k);
      if (nextChar == ' ') { continue}
      else if (nextChar == "\t") { continue; }
      else { firstCharPos = k; firstChar = nextChar; break; }
    }
    return firstChar;
}

function convertFile(err, contents) {
  var lines = contents.split("\n");
  var expectedIndent = 0;
  var inLineContinuation = false;
  var firstChar = "";
  var spaceLines = [];
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
    spaceLines[i] = spaces;
  }

  for (var i = 0 ; i < lines.length; i++) {
    var currentLine = lines[i];
    var spaces = spaceLines[i];
    // console.log(spaces);
    // begin a block
    var blockBegin = currentLine.lastIndexOf(":");
    if (spaces != 0 && spaces < spaceLines[i-1] && expectedIndent > 0) {
        console.log("}");
        console.log(currentLine);
        expectedIndent--;
    } else if (blockBegin != -1 && blockBegin == currentLine.length - 1) {
      if (spaces == expectedIndent - 1) {
        // console.log(createSpaces(expectedIndent - 1) + "}");
        // expectedIndent--;
      }
      console.log(currentLine.substring(0, currentLine.length - 1) + " {");
      expectedIndent++;
  } else if (spaces == 0 && expectedIndent > 0) {
      var collapseStack = false;
      var until = 0;
      for (var k = i+1 ; k < spaceLines.length ; k++) {
          if (spaceLines[k] == expectedIndent) {

              break;
          } else {
              collapseStack = true;
              until = spaceLines[k];
              break;
          }
      }
      if (collapseStack) {
          for (var k = 0 ; k < expectedIndent - until; k++) {
              console.log("}");
          }
          expectedIndent -= expectedIndent - until;
      }
    } else if (currentLine.length > 0 && scanNextLineFirstChar(lines[i+1]) != "+") {
      console.log(currentLine + ";");
    } else {
      console.log(currentLine);
    }


  }
}

fs.readFile(process.argv[2], 'utf8', convertFile);
