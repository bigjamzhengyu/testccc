var express = require('express');
var router = express.Router();

router.get('/',(req,res,next)=>{
    if(req.session.userid){
        delete req.session.userid;
    }
    res.render('index');
});

module.exports = router;