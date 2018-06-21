var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var ObjectId = mongojs.ObjectId;
var db = mongojs('mongodb://sang:sang2810@ds127439.mlab.com:27439/mytasklist_sang', ['info']);


router.get('/:id', function (req, res, next) {
    var user = req.params.id;
    setTimeout(
        function () {
            db.info.find({ user: user }, function (err, profile) {
                if (err) {
                    console.log(err);
                    res.send(err);
                }
                res.json(profile);
            });
        }, 500);


});

router.post('/register', function (req, res, next) {
    var user = req.body.key;
    var profile = req.body.profile;
    var data = [];
    data.push(profile);
    db.info.find({ user: user }, function (err, docs) {
        if (docs.length === 0) {
            db.info.save({ user: user, data });
        }
        else {
            var key = docs[0]._id;
            db.info.update({ _id: key },
                { $push: { data: profile } }, { multi: true }, function (err, task) {
                    if (err) {
                        res.send(err);
                    }
                    res.json(task);
                })
        }
    })


});



router.post('/updategeneralinfomation', function (req, res, next) {
    var profile = req.body.profile;
    var user = req.body.key;
    var key = "";
    db.info.find({ user: user }, function (err, profileDB) {
        if (err) {
            console.log(err);
            res.send(err);
        }
        db.info.update({ _id: mongojs.ObjectId(profileDB[0]._id) },
            { $set: { "data.0.personalInfo": profile } }, { multi: true }, function (err, task) {
                if (err) {
                    res.send(err);
                }
                res.json(task);
            })
    });


})


router.post('/updateeducation', function (req, res, next) {
    console.log('aaa');
    var education = req.body.profile;
    console.log(education);
    var key = req.body.key;
    console.log(key);



    db.info.update({ _id: mongojs.ObjectId(key) },
        { $set: { education: education } }, { multi: true }, function (err, task) {
            if (err) {
                res.send(err);
            }
            res.json(task);
        })
})


router.post('/updatetechnicalskill', function (req, res, next) {
    var technicalSkill = req.body.profile;
    var key = req.body.key;



    db.info.update({ _id: mongojs.ObjectId(key) },
        { $set: { technicalSkill: technicalSkill } }, { multi: true }, function (err, task) {
            if (err) {
                res.send(err);
            }
            res.json(task);
        })
})


router.post('/updateexperience', function (req, res, next) {
    var experience = req.body.profile;
    var key = req.body.key;



    db.info.update({ _id: mongojs.ObjectId(key) },
        { $set: { experience: experience } }, { multi: true }, function (err, task) {
            if (err) {
                res.send(err);
            }
            res.json(task);
        })
})

module.exports = router;