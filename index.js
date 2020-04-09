const http = require('http');
const url = require('url');
const server = http.createServer(function(req, res) {
const page = url.parse(req.url).pathname;

const One = require('./One');
const Two = require('./Two');
const Three = require('./timeZoneTree');
const Four = require('./Four');

res.writeHead(200, {"Content-Type": "text/plain"});

if (page == '/One') {
    const result = One.findDistance('LKA','IND');
    res.write("Distance is :"+ result.toString()+" KMS");
}

else if (page == '/Two') {
    const result = Two.closestNonNeighbourCountry('LKA');
    res.write("Closest Non neighbour country is "+result.country +" and distance is "+ (result.distance).toString());
}

else if (page == '/Three') {
    const result = Three.binarySearchGetZone("UTC+03:00","UTC+06:00");
    res.write(result);
}

else if (page == '/Four') {
    const result = Four.searchCountry("A");
    res.write(result);
}


res.end();
});
server.listen(8080);