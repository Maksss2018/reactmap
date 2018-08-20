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


server.post("/get-nearest-places", function(req, res) {
    let data = req.body,
        url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${data.center.lat},${data.center.lng}&radius=${data.radius}&type=${data.type}&key=AIzaSyB2Dt6pCKcFvO4FxADbJDoK8gnvKNkLS1w`;
    let cross;
    request.get(url, (error, response, body) => {
        console.log("response.body nearbysearch  : " + response.body);
        return googleResponse = JSON.parse(response.body);

    });

    setTimeout(function() {
        console.log("googleResponse.results : " + googleResponse.results);
        res.send(googleResponse.results);

    }, 500)
});


server.post("/", function(req, res) {
    let newUser = req.body;
    db.addNewUser(newUser).then((data) => res.send(data)).catch((error) => console.log(error));
    console.log("new user");
});

server.post("/deleteMark", function(req, res) {
    let delteItem = req.body;
    db.deleteMark(delteItem).then((data) => res.send(data)).catch((error) => console.log(error));
    console.log("Deleted :" + delteItem.address + " from " + delteItem.token);
});
server.post("/check-marks", function(req, res) {
    let data = req.body;
    db.CheckingData(data).then((data) => res.send(data)).catch((error) => console.log(error));
    console.log("Checking this data-------");
    console.log(data);
    console.log("Checking this data-------");
});
server.post("/getNewUserData", function(req, res) {
    let newUserData = req.body;
    let counter = 0;
    console.log("got new data!!!!!!" + counter);
    counter++;
    //  if (newUserData.user != "new" && newUserData.user != undefined) {
    db.updateUserData(newUserData).then((data) => {

        res.send(data)
    }).catch((error) => console.log(error));
    console.log("new user");
    /*    }
        else {
    db.addNewUser(newUserData).then((data) => res.send(data)).catch((error) => console.log(error));
    console.log("new user");

        };*/
});

server.post("/dbState", function(req, res) {
    let token = req.body;
    db.dbChanges(token).then((data) => res.send(data)).catch((error) => console.log(error));
    console.log(" user  is online, checking DB " + token.token);

});


server.listen(8082, function() {
    console.log("Server is ON!");
});
/*
$ mkdir data
$ echo 'mongod --bind_ip=$IP --dbpath=data --nojournal --rest "$@"' > mongod
$ chmod a+x mongod
*/
