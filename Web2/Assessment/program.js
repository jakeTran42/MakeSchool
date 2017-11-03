//-------------------------------Problem 1----------------------------------//

// console.log('HELLO WORLD');

//-------------------------------Problem 2----------------------------------//

// var result = 0;
// for (i = 2; i < process.argv.length; i++) {
//   result += Number(process.argv[i]);
// }

// console.log(result);

//-------------------------------Problem 3----------------------------------//


// var fs = require('fs');
//
// var filename = process.argv[2];
//
// file = fs.readFileSync(filename);
//
// contents = file.toString();
//
// console.log(contents.split('\n').length - 1);

//-------------------------------Problem 4----------------------------------//


// var fs = require('fs');
//
// var filename = process.argv[2];
//
// file = fs.readFile(filename, function(err, data) {
//   console.log(data.toString().split('\n').length - 1);
// });

//-------------------------------Problem 5----------------------------------//

// var fs = require('fs');
//
// var dirname = process.argv[2];
// var ext = process.argv[3];
// var pat = RegExp('\\.' + ext + '$');
//
// file = fs.readdir(dirname, function(err, files) {
//   for (i = 0; i < files.length; i++) {
//     if (pat.test(files[i])) {
//       console.log(files[i]);
//     }
//   }
// });

//-------------------------------Problem 6----------------------------------//

// var mymodule = require('./06-mymodule');
//
// var directory = process.argv[2]
// var ext = process.argv[3];
//
// mymodule(directory, ext, function(err, files) {
//     if (err) {
//         return console.error('error:', err);
//     }
//
//     files.forEach(function(file) {
//         console.log(file);
//     });
// });

//-------------------------------Problem 7----------------------------------//

// var http = require('http');
//
// var url = process.argv[2];
//
// http.get(url, function(request) {
//   request.setEncoding("utf8");
//   request.on("data", function(data) {
//     console.log(data);
//   });
// });


//-------------------------------Problem 8----------------------------------//


// var http = require('http');
//
// var url = process.argv[2];
//
// http.get(url, function(request) {
//   var result = "";
//   request.setEncoding("utf8");
//   request.on("data", function(data) {
//     result += data;
//   });
//   request.on("end", function() {
//     console.log(result.length);
//     console.log(result);
//   });
// });

//-------------------------------Problem 9----------------------------------//

// var http = require('http');
//
// var urls = process.argv.slice(2);
// var results = [];
//
// // initialise results array
// for (i = 0; i < urls.length; i++) {
//   results[i] = null;
// }
//
// for (i = 0; i < urls.length; i++) {
//   (function(i) {
//     http.get(urls[i], function(request) {
//       var result = "";
//       request.setEncoding("utf8");
//       request.on("data", function(data) {
//         result += data;
//       });
//       request.on("end", function() {
//         results[i] = result;
//         var resultCount = 0;
//         for (j = 0; j < results.length; j++) {
//           if (results[j] != null) resultCount++;
//         }
//         if (resultCount == results.length) {
//           for (j = 0; j < results.length; j++) {
//             console.log(results[j]);
//           }
//         }
//       });
//     });
//   })(i);
// }

//-------------------------------Problem 10----------------------------------//

// var net = require('net');
//
// function pad(n) { return n < 10 ? '0' + n : n }
//
// var server = net.createServer(function(socket) {
//   d = new Date();
//   s = d.getFullYear() + "-"
//     + pad(d.getMonth() + 1) + "-"
//     + pad(d.getDate()) + " "
//     + pad(d.getHours()) + ":"
//     + pad(d.getMinutes()) + "\n";
//   socket.end(s);
// });
// server.listen(process.argv[2]);

//-------------------------------Problem 11----------------------------------//


// var fs = require('fs');
// var http = require('http');
//
// var filename = process.argv[3];
//
// server = http.createServer(function(request, response) {
//   fs.createReadStream(filename).pipe(response);
// });
// server.listen(process.argv[2]);

//-------------------------------Problem 12----------------------------------//

var http = require('http');

var map = require('through2-map');

uc = map(function(chunk) {
  return chunk.toString().toUpperCase();
});

server = http.createServer(function(request, response) {
  if (request.method == 'POST') {
    request.pipe(uc).pipe(response);
  }
});
server.listen(process.argv[2]);


//-------------------------------Problem 13----------------------------------//

var http = require('http');
var url = require('url');

var routes = {
  "/api/parsetime": function(parsedUrl) {
    d = new Date(parsedUrl.query.iso);
    return {
      hour: d.getHours(),
      minute: d.getMinutes(),
      second: d.getSeconds()
    };
  },
  "/api/unixtime": function(parsedUrl) {
    return {unixtime: (new Date(parsedUrl.query.iso)).getTime()};
  }
}

server = http.createServer(function(request, response) {
  parsedUrl = url.parse(request.url, true);
  resource = routes[parsedUrl.pathname];
  if (resource) {
    response.writeHead(200, {"Content-Type": "application/json"});
    response.end(JSON.stringify(resource(parsedUrl)));
  }
  else {
    response.writeHead(404);
    response.end();
  }
});
server.listen(process.argv[2]);
