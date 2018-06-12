var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://sang:sang2810@ds127439.mlab.com:27439/mytasklist_sang',['info']);


router.get('/', function(req,res,next){
    db.info.find(function(err, profile){
        if(err){
            console.log(err);
            res.send(err);
        }
        res.json(profile);
    })
});


router.post('/updategeneralinfomation', function(req,res,next){
    var profile = req.body.profile;
    var key = req.body.key;
    console.log(profile);
    console.log(key);
   
    db.info.update({_id: mongojs.ObjectId(key)}, 
    {$set: {personalInfo: profile}}, {multi: true}, function(err,task){
        if(err){
            res.send(err);
        }
        res.json(task);
    })
})

module.exports = router;