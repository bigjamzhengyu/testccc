var express = require('express');
var Room = require('../src/db/models/room');
var result = require('../src/utils/result');
var router = express.Router();

router.get('/', (req,res,next)=>{
   if(req.session.userid){
       return next();
   } 
   res.render('login');
});

router.get('/',(req,res,next)=>{
   res.render('chatroom',{userid:req.session.userid}); 
});

router.post('/room',(req,res)=>{
    console.log(req.body);
    var rs = result();
    if(!req.body.roomName){
        rs.error = '房间名称不能为空!';
        return res.json(rs);
    }
    var userid = req.session.userid;
    var r = new Room({
        roomName: req.body.roomName,
        roomContent: req.body.roomContent,
        roomCreateUser: userid,
        roomImg: '',
        roomCreateDate: Date.now(),
        roomJoinPeos: 0
    });
    r.save((err,doc)=>{
       if(err){
           rs.error = err;
       } else{
           rs.data = doc;
       }
       res.json(rs);
    });
});

router.get('/list',(req,res,next)=>{
   var rs = result();
   Room.find((err,docs)=>{
       rs.error = err;
       rs.data = docs;
       res.json(rs);
   });
});

module.exports = router;