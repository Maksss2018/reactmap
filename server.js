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
    let newUser = req.body;
    db.addNewUser(newUser).then((data) => res.send(data)).catch((error) => console.log(error));
        console.log("new user");
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
    console.log("geted new data!!!!!!");
    if(newUserData.user!="new"||newUserData.user!=undefined){
        db.updateUserData(newUserData).then((data) => res.send(data)).catch((error) => console.log(error));
    }else{
        db.addNewUser(newUserData).then((data) => res.send(data)).catch((error) => console.log(error));
    console.log("new user");
        
    };
});

server.post("/dbState", function(req, res) {
    let token = req.body;
    db.dbChanges(token).then((data) => res.send(data)).catch((error) => console.log(error));
    console.log(" user  is online, checking DB "+token.token);
    
});


server.listen(8082, function() {
    console.log("Server is ON!");
});
/*
$ mkdir data
$ echo 'mongod --bind_ip=$IP --dbpath=data --nojournal --rest "$@"' > mongod
$ chmod a+x mongod
*/
