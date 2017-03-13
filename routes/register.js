var express = require('express');
var router = express.Router();
var User = require('../src/db/models/user');
var result = require('../src/utils/result');
var router = express.Router();

router.get('/', (req,res,next)=>{
    res.render('register'); 
});

router.post('/', (req,res,next)=>{
    var urname = req.body.name;
    var pwd = req.body.password;

    var r = result();
    
    if(!urname || !pwd){
        r.error = '用户名或密码不能为空！';
        return res.json(r);
    }
   var user = new User({
       name: urname,
       pwd: pwd,
       register: Date.now()
   });
   user.save((err,doc)=>{
      if(err){
          r.error = err;
      } else{
          r.data = 'ok';
      }
      console.log('hhhhhhhhh');
      console.log(doc);
      return res.json(r);
   });
});

module.exports = router;