const http = require('http');
const url = require('url');
const server = http.createServer(function(req, res) {
const page = url.parse(req.url).pathname;

const One = require('./One');
const Two = require('./Two');
const Tree = require('./treeStructure');
const Zone = require('./timeZoneTree');
const Four = require('./Four');

res.writeHead(200, {"Content-Type": "text/plain"});

if (page == '/One') {
    const result = One.findDistance('AFG','LKA');
    res.write("Distance is :"+ result.toString()+" KMS");
}

else if (page == '/Two') {
    const result = Two.closestNonNeighbourCountry('AFG');
    res.write("Closest Non neighbour country is"+result.country +" and distance is "+ (result.distance).toString());
}

else if (page == '/Three') {
    const result = Zone.binarySearchGetZone("UTC+03:00","UTC+06:00");
    res.write(result);
}

else if (page == '/Four') {
    const result = Four.searchCountry("KA");
    res.write(result);
}


res.end();
});
server.listen(8080);