///load data, linking routes to "data" sources

var friends = require("../data/friends");

//Routing

module.exports = function (app) {
    //return friends in friends.js
    app.get("/api/friends", function (req, res) {
        res.json(friends);
    });

    //API POST Requests
    app.post("/api/friends", function (req, res) {
        console.log(req.body);
        // Note the code here. Our "server" will respond to request
        findBestMatch(req.body, function(data){
            res.json(data);
        });
        
    });

    app.post("/api/clear", function (req, res) {
        // Empty out the arrays of data
        friends.length = [];
        res.json({ ok: true });
    });
};

//ele is friend, e = score

function findBestMatch(newfriend, frog) {
    var lowestDifference;
    var bestMatch;
    friends.forEach((ele, index) =>{
        var scoreDifference = 0;
        ele.scores.forEach((e, i) => {
            var currentScoreDif = e - newfriend.scores[i];
            scoreDifference += Math.abs(currentScoreDif)
        });
        if(!lowestDifference || scoreDifference < lowestDifference) {
            lowestDifference = scoreDifference;
            bestMatch = ele;
        }
    });

    frog(bestMatch);

}