var express = require('express');
var User = require('../src/db/models/user');
var result = require('../src/utils/result');
var router = express.Router();

router.get('/', (req,res,next)=>{
    res.render('login');
});

router.post('/',(req,res,next)=>{
   var r = result();
   if (!req.body.username || !req.body.password){
       r.error = '用户名或密码不能为空';
       return res.json(r);
   }
   var u = new User({
       name: req.body.username,
       pwd: req.body.password
   });
   User.find(u,(err,doc)=>{
       if(err){
           r.error = '用户名或密码不正确';
           return res.json(r);
       }
       
       req.session.userid = u.name;
       res.json(r);
   });
});

module.exports = router;