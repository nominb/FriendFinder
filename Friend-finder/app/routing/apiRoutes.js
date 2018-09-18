///load data, linking routes to "data" sources

var friends = require("../data/friends");
var path = require("path");

//Routing

module.exports = function (app) {
    //return friends in friends.js
    app.get("/api/friends", function (req, res) {
        res.json(friends);
    });

    //API POST Requests
    app.post("/api/friends", function (req, res) {
        // Note the code here. Our "server" will respond to request
        if (friends.length < 10) {
            friends.push(req.body);
            res.json(true);
        }
        else {
            path.push(req.body);
            res.json(false);
        }
    });

    app.post("/api/clear", function (req, res) {
        // Empty out the arrays of data
        friends.length = [];

        res.json({ ok: true });
    });
};
