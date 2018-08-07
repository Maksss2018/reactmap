const express = require("express"),
    request = require('request');
let server = express();
let bodyParser = require("body-parser");
let cors = require("cors");
let googleResponse = {};

//let db = require("") ;//make db configs + schema + utils
let db = require('./services/mongoose/utils');

db.dbConnection();

server.use(bodyParser.json());

server.use(cors({ origin: '*' }));

server.post("/all-types", function(req, res) {

    db.getSpaData().then((data) => res.send(data)).catch((error) => console.log("server get error  from DB" + error));


});

server.post("/get-nearest-places", function(req, res) {
    let data = req.body,
        url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${data.lat},${data.lng}&radius=${data.radius}&type=${data.type}&key=AIzaSyB2Dt6pCKcFvO4FxADbJDoK8gnvKNkLS1w`;
    let cross;
    request.get(url, (error, response, body) => {

        console.log("response.body : " + response.body);
        return googleResponse = JSON.parse(response.body);

    });

    setTimeout(function() {
        console.log("googleResponse.results : " + googleResponse.results);
        res.send(googleResponse.results);

    }, 500)
});
server.post("/", function(req, res) {
    let isUserSignIn = req.body;
    db.isSignIn(isUserSignIn).then((data) => res.send(data)).catch((error) => console.log(error));


});

server.post("/sign-in", function(req, res) {
    let passAndLogin = req.body;
    db.addNewUser(passAndLogin).then((data) => res.send(data)).catch((error) => console.log(error));

});

server.post("/in-out", function(req, res) {
    let inOut = req.body;
    db.loginLogoutAPI(inOut).then((data) => res.send(data)).catch((error) => console.log(error));
    console.log("Now he is " + inOut);
});

server.get("/save-marks:id", function(req, res) {
    let marks = req.body,
        id = req.params.id;
    db.loginLogoutAPI({ id, marks }).then((data) => res.send(data)).catch((error) => console.log(error));
    console.log("New marks to push!!!!" + marks);
});

server.listen(8082, function() {
    console.log("Server is ON!");
});
/*
$ mkdir data
$ echo 'mongod --bind_ip=$IP --dbpath=data --nojournal --rest "$@"' > mongod
$ chmod a+x mongod
*/
