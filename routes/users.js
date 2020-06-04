const express = require('express');
const router = express.Router();
//models
const User = require('../models/User');

/* GET users listing. */
router.get('/', (req, res, next)=> {
  const promise = User.find({},{_id:0,name:1,purpose:1,purpose_time:1,pic_dic:1})

  promise.then((all_users)=>{ 
    
    
    res.render('index',{ all_data: all_users });  
  }).catch((err)=>{
    next({message:'Error ocupied'});
  })
});

router.post('/',(req,res,next)=>{
  const user = new User(req.body);
  user.save((err,data)=>{
    if(err)
    res.json(err)
    else{
      res.json(data)
    }
  })
})
module.exports = router;
