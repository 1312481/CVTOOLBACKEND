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
        }, 2000);


});
router.post('/checkUserExistence', function (req, res, next) {
    var user = req.body.key;
    var profile = req.body.profile;
    if (profile === "") {
        db.info.find({ user: user }, function (err, docs) {
            console.log(docs);
            if (docs.length === 0) {
                res.json('failed')
            }
            else {
                res.json('success')
            }
        })
    }
    else{
        res.json('success')
    }
});
router.post('/updateversion', function (req, res, next) {
    var versionName = req.body.profile;
    var user = req.body.key;
    var version = req.body.version;
    var keyObject = "data." + version + ".tagName";
    var objectUpdated = {

    }
    objectUpdated[keyObject] = versionName;
    db.info.find({ user: user }, function (err, profileDB) {
        if (err) {
            console.log(err);
            res.send(err);
        }
        db.info.update({ _id: mongojs.ObjectId(profileDB[0]._id) },
            { $set: objectUpdated }, { multi: true }, function (err, task) {
                if (err) {
                    res.send(err);
                }
                res.json(task);
            })
    });

})
router.post('/register', function (req, res, next) {
    var user = req.body.key;
    var profile = req.body.profile;
    var tagName = req.body.version;
    var data = [];
    profile.tagName = tagName;
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
    var version = req.body.version;
    var keyObject = "data." + version + ".personalInfo";

    var objectUpdated = {

    }
    objectUpdated[keyObject] = profile;
    db.info.find({ user: user }, function (err, profileDB) {
        if (err) {
            console.log(err);
            res.send(err);
        }
        db.info.update({ _id: mongojs.ObjectId(profileDB[0]._id) },
            { $set: objectUpdated }, { multi: true }, function (err, task) {
                if (err) {
                    res.send(err);
                }
                res.json(task);
            })
    });


})


router.post('/updatetechnicalskill', function (req, res, next) {
    var technicalSkill = req.body.profile;
    var user = req.body.key;
    var version = req.body.version;
    var keyObject = "data." + version + ".technicalSkill";
    var objectUpdated = {

    }
    objectUpdated[keyObject] = technicalSkill;
    db.info.find({ user: user }, function (err, profileDB) {
        if (err) {
            console.log(err);
            res.send(err);
        }
        db.info.update({ _id: mongojs.ObjectId(profileDB[0]._id) },
            { $set: objectUpdated }, { multi: true }, function (err, task) {
                if (err) {
                    res.send(err);
                }
                res.json(task);
            })
    });

})


router.post('/updateeducation', function (req, res, next) {
    var education = req.body.profile;
    var user = req.body.key;
    var version = req.body.version;
    var keyObject = "data." + version + ".education";
    var objectUpdated = {

    }
    objectUpdated[keyObject] = education;
    db.info.find({ user: user }, function (err, profileDB) {
        if (err) {
            console.log(err);
            res.send(err);
        }
        db.info.update({ _id: mongojs.ObjectId(profileDB[0]._id) },
            { $set: objectUpdated }, { multi: true }, function (err, task) {
                if (err) {
                    res.send(err);
                }
                res.json(task);
            })
    });

})



router.post('/updateexperience', function (req, res, next) {


    var education = req.body.profile;
    var user = req.body.key;
    var version = req.body.version;
    var keyObject = "data." + version + ".experience";
    var objectUpdated = {

    }
    objectUpdated[keyObject] = education;
    db.info.find({ user: user }, function (err, profileDB) {
        if (err) {
            console.log(err);
            res.send(err);
        }
        db.info.update({ _id: mongojs.ObjectId(profileDB[0]._id) },
            { $set: objectUpdated }, { multi: true }, function (err, task) {
                if (err) {
                    res.send(err);
                }
                res.json(task);
            })
    });

})

module.exports = router;