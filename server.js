//jshint esversion: 6

const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const https = require("https");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));

app.get("/", function(req, res) {
res.sendFile(__dirname + "/signup.html");
 });

app.post("/", function(req, res) {
 const name = req.body.fname;
 const surname =req.body.fsurname;
 const email = req.body.femail;


const data = {
  members: [
    {
      email_address: email,
      status: "subscribed",
      merge_fields: {
        FNAME: name,
        LSURNAME: surname  }
      }
          ]
};

const jsonData = JSON.stringify(data);

const url = "https://us19.api.mailchimp.com/3.0/lists/606cf1252";
const options = {
  method: "POST",
  auth: "dewxas:b67bcfd503ebb0dfd6e9d9e7ab0aa83e-us19"
};
const request = https.request(url, options, function(response) {

if (response.statusCode == 200) {
  res.sendFile(__dirname + "/success.html");

} else res.sendFile(__dirname + "/failure.html");

 response.on("data", function(data){
   console.log(JSON.parse(data));
 });

});

request.write(jsonData);
request.end();
});

app.post("/failure", function(req, res) {
  res.redirect("/");
});


app.listen(3000, function() {
	console.log("Server is listening on port 3000"); });



// mailChimp API key: b67bcfd503ebb0dfd6e9d9e7ab0aa83e-us19
// mailChimp ID: 606cf12527
