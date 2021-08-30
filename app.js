'use strict'

//Http
// Express App (Routes)
const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const path = require("path");

app.use(bodyParser.json());

const fs = require('fs');
const JavaScriptObfuscator = require('javascript-obfuscator');

let currentUser;
let jobs = [{"companyName":"Facebook", "jobTitle": "Software Engineer","jobPay":"30/hr", "dateApplied":"12/18/2020", "status" : "No Response"},
{"companyName":"Apple", "jobTitle": "Software Developer","jobPay":"80/hr", "dateApplied":"12/20/2020", "status" : "No Response"},
{"companyName":"Microsoft", "jobTitle": "Junior Software Engineer","jobPay":"50/hr", "dateApplied":"12/18/2020", "status" : "Interview"}
];

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/public/index.html'));
});

app.get('/profile', function (req, res) {
  res.sendFile(path.join(__dirname + '/public/profile.html'));
});

app.get('/tracker', function (req, res) {
  res.sendFile(path.join(__dirname + '/public/tracker.html'));
});


app.get('/index.js', function (req, res) {
  fs.readFile(path.join(__dirname + '/public/index.js'), 'utf8', function (err, contents) {
    const minimizedContents = JavaScriptObfuscator.obfuscate(contents, { compact: true, controlFlowFlattening: true });
    res.contentType('application/javascript');
    res.send(minimizedContents._obfuscatedCode);
  });
});

app.get('/profile.js', function (req, res) {
  fs.readFile(path.join(__dirname + '/public/profile.js'), 'utf8', function (err, contents) {
    const minimizedContents = JavaScriptObfuscator.obfuscate(contents, { compact: true, controlFlowFlattening: true });
    res.contentType('application/javascript');
    res.send(minimizedContents._obfuscatedCode);
  });
});

app.get('/tracker.js', function (req, res) {
  fs.readFile(path.join(__dirname + '/public/tracker.js'), 'utf8', function (err, contents) {
    const minimizedContents = JavaScriptObfuscator.obfuscate(contents, { compact: true, controlFlowFlattening: true });
    res.contentType('application/javascript');
    res.send(minimizedContents._obfuscatedCode);
  });
});

app.post('/registerUser', async function (req, res) {

  console.log("*****Register User POST request*****");
  let user = req.body;

  currentUser = user;
  console.log(currentUser);
  res.end();

});

app.post('/logIn', async function (req, res, next) {
  console.log("*****Log In POST request*****");
  let credentials = req.body;
  let passwordAttempt = credentials["password"];
  console.log("*****Current User: " + currentUser + "*****");

  if(passwordAttempt != currentUser["password"]){
      next("*****ERROR:Password is incorrect*****");
  }

  res.end();

});

app.get('/loadProfile', async function (req, res) {
  console.log("*****Load Profile GET request*****");
  console.log("*****Current User: " + currentUser + "*****");
  //console.log(account);
  res.send(currentUser);

});

app.get('/loadTracker', async function (req, res) {
  console.log("*****Load Tracker GET request*****");
  console.log("*****Current User: " + currentUser + "*****");
  //console.log(account);
  res.send(jobs);

});

app.listen(8080, function(){
  console.log('Listening on port 8080');
});