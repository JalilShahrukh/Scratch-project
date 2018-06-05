const User = require('./../db/loginSchema'); 

const userController = {}; 
userController.createUser = (req, res) => { 
  console.log(req.body); 
  User.create({
    username: req.body.username, 
    password: req.body.password
  }, (err, user) => { 
    if (err) res.send(err); 
    res.json(user); 
  }); 
}

userController.verifyUser = (req, res) => { 
  console.log(req.body); 
  User.findOne(req.body, (err, user) => { 
    if (user === null) res.send({err: 'User does not exist. Please create one.'}); 
    res.locals.info = user; 
    res.send(user); 
  }); 
}

module.exports = userController; 