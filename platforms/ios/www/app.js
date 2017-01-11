var app = require("express")();
var bodyParser = require('body-parser');
const low = require('lowdb')
const storage = require('lowdb/file-sync')
const db = low('db.json', { storage: storage })
app.use(bodyParser.urlencoded({ extended: false }));

var token = function(length) {
	var length = length || 25;
	var chars = "abcdefghijklmnopqrstuvwxyz0123456789";
	var token = "";
	for(var i=0; i<length; i++) {
		var R = Math.floor(Math.random()*chars.length);
		token += chars.substring(R, R+1);
	}
	return token;
};

app.get("/", function(req, res) {
	res.send("Hello");
});
app.post("/upload", function(req, res) {
	console.log(req.body);
	var found = false, id = token(6);
	while (!found) {
		if (typeof db("organizers").find({ id: id }) == "undefined") {
			found = true;
		} else {
			id = token(6);
		}
	}
	req.body["JoinCode"] = id;
	db("organizers").push(req.body);
	res.redirect("/displaycode.html");
});

app.set("host", "0.0.0.0");
app.listen(1337);
/*
fs=require('fs');
fs.writeFile("data.txt", req, function(err){
	if (err) return console.log(err);
});
*/
/*var fs = require('fs');
function appendObject(obj){
  var configFile = fs.readFileSync('./config.json');
  var config = JSON.parse(configFile);
  config.push(obj);
  var configJSON = JSON.stringify(config);
  fs.writeFileSync('./config.json', configJSON);
}

appendObject({OnetimeCode : WEAS_Server_NewOneTimeCode});

var fs = require('fs')
var fileName = './data.text'
var file = require(fileName)

file.key = "new value"

fs.writeFile(fileName, JSON.stringify(file), function (err) {
  if (err) return console.log(err)
  console.log(JSON.stringify(file))
  console.log('writing to ' + fileName)
});
*/