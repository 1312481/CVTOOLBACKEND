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
    var key = '5b1f70e9e7179a58927feb37';
    console.log(profile);
    console.log(key);


   
    db.info.update({_id: mongojs.ObjectId(key)}, 
    {$set: {"data.$[t].personalInfo": profile}}, 
    {arrayFilters: [{"t.user": "SD123"}], multi: true }, 
    function(err,task){
        if(err){
            res.send(err);
        }
        res.json(task);
    })
})


router.post('/updateeducation', function(req,res,next){
    console.log('aaa');
    var education = req.body.profile;
    console.log(education);
    var key = req.body.key;
    console.log(key);
    
  
   
    db.info.update({_id: mongojs.ObjectId(key)}, 
    {$set: {education: education}}, {multi: true}, function(err,task){
        if(err){
            res.send(err);
        }
        res.json(task);
    })
})


router.post('/updatetechnicalskill', function(req,res,next){
    var technicalSkill = req.body.profile;
    var key = req.body.key;

  
   
    db.info.update({_id: mongojs.ObjectId(key)}, 
    {$set: {technicalSkill: technicalSkill}}, {multi: true}, function(err,task){
        if(err){
            res.send(err);
        }
        res.json(task);
    })
})


router.post('/updateexperience', function(req,res,next){
    var experience = req.body.profile;
    var key = req.body.key;

  
   
    db.info.update({_id: mongojs.ObjectId(key)}, 
    {$set: {experience: experience}}, {multi: true}, function(err,task){
        if(err){
            res.send(err);
        }
        res.json(task);
    })
})

module.exports = router;