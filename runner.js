var page = require('webpage').create();

var url = 'http://localhost:63342/shoreditch-ui-chrome/chrome/elm.html?_ijt=b1l7447hgqevc64sbi3u762grb'

//shamelessly stolen from: https://github.com/ariya/phantomjs/blob/master/examples/waitfor.js
"use strict";
function waitFor(testFx, onReady, timeOutMillis) {
    var maxtimeOutMillis = timeOutMillis ? timeOutMillis : 3000, //< Default Max Timout is 3s
        start = new Date().getTime(),
        condition = false,
        interval = setInterval(function() {
            if ( (new Date().getTime() - start < maxtimeOutMillis) && !condition ) {
                // If not time-out yet and condition not yet fulfilled
                condition = (typeof(testFx) === "string" ? eval(testFx) : testFx()); //< defensive code
            } else {
                if(!condition) {
                    // If condition still not fulfilled (timeout but condition is 'false')
                    console.log("'waitFor()' timeout");
                    //phantom.exit(1);
                    return ["timeout"]
                } else {
                    // Condition fulfilled (timeout and/or condition is 'true')
                    console.log("'waitFor()' finished in " + (new Date().getTime() - start) + "ms.");
                    typeof(onReady) === "string" ? eval(onReady) : onReady(); //< Do what it's supposed to do once the condition is fulfilled
                    clearInterval(interval); //< Stop this interval
                    return []
                }
            }
        }, 250); //< repeat check every 250ms
};


page.onConsoleMessage = function(msg, lineNum, sourceId) {
  console.log('CONSOLE: ' + msg + ' (from line #' + lineNum + ' in "' + sourceId + '")');
};

/*
page.onError = function(msg, trace) {

  var msgStack = ['ERROR: ' + msg];

  if (trace && trace.length) {
    msgStack.push('TRACE:');
    trace.forEach(function(t) {
      msgStack.push(' -> ' + t.file + ': ' + t.line + (t.function ? ' (in function "' + t.function +'")' : ''));
    });
  }

  console.error(msgStack.join('\n'));

};
*/

//var r = page.injectJs("tests.js") ? "... done injecting tests.js!" : "... fail! Check the $PWD?!";
//console.log(r);

//var x = page.evaluate(function() {
//  var result = test();
//  console.log(result);
//  return result;
//});
//
//console.log(x);

//TODO: make this an argument ...
//TODO: make the .html of the app an an argument too ... (actually be separate)
var r2 = phantom.injectJs("tests.js") ? "... done injecting elm.js!" : "... fail! Check the $PWD?!";
console.log(r2);

//var x2 = page.evaluate(function() {
  var app = Elm.Spelling.fullscreen();

  console.log("Running elm ...");

  app.ports.check.subscribe(function(word) {
      //var suggestions = spellCheck(word);
      console.log("Elm got a message in ...");
      console.log(word.id);
      console.log(word.command);

      if (word.command == "click") {
        console.log("clicking");
        var result = click();
        console.log("clicked");
        console.log(result);
      }

//      app.ports.suggestions.send({id = '"' ++ word.id + '"'});
//      app.ports.suggestions.send("{id = ''}");
      app.ports.suggestions.send({
      id:word.id,
      failures:[]
      });
  });

//  return "elmed it";
//});

//console.log(x2);



//page.open(url, function(status) {
//  if (status !== 'success') {
//    console.log('Unable to access network');
//  } else {

        //STEP 1 - Goto(url)
        //waitFor(function() {
          //condition
          //return
          //val r =
          console.log("### Goto(url)");
          page.open(url, function(status) {
              if (status !== 'success') {
                console.log('Unable to access network');
                //return false
              } else {
                console.log('--> I went to ...');
                //return true
              }
          });
          page.render('step-1.png')

          //action
          //}, function() {
          //   console.log("url should be visible now.");
          //});

        click();

        //STEP 3 - Assert(TextContains(id, value))
        console.log("### Assert(TextContains(id, value))");
        waitFor(function() {
          //condition
          return page.evaluate(function() {
              //TODO: need to check unique etc
              return $("#messageList").is(":contains('ManualMetaDataRefresh')");
          });

          //action
          }, function() {
             console.log("--> Text did contain it now.");
             page.render('step-3.png')
             phantom.exit();
          });
//    }
//});

//TODO: have the app call back (via port) when ready .... or just assert something instead ...

function click() {
    //STEP 2 - Click(id)
    console.log("### Click(id)");
    var r = waitFor(function() {
      //condition
      return page.evaluate(function() {
          //TODO: need to check unique etc
          return $("#refreshButton").is(":visible");
      });

      //action
      }, function() {
    //             console.log("Element should be visible now.");
         page.evaluate(function() {
            $("#refreshButton").click();
         });
         page.render('step-2.png')
         console.log("--> I clicked it");
         //console.log(page.plainText);
         //phantom.exit();
      });

  console.log("click() returning")
  console.log(r)
  return r
}

