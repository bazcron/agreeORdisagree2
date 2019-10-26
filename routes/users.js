let users = require('../models/users');
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

function getByValue(array, id) {
  var result = array.filter(function (obj) {
    return obj.id == id;
  });
  return result ? result[0] : null; // or undefined

}
function getUserById(array, id) {
  var result = array.filter(function (obj) {
    return obj.id == id;
  });
  return result ? result[0] : null; // or undefined
}

router.addUser = (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  //Add a new User
  var id = Math.floor((Math.random() * 1000000) + 1); //Randomly generate an id
  var numberOfUsers = users.length;

  users.push({"id" : id, "name": req.body.name, "email": req.body.email, "password": req.body.password, agree:0, disagree:0});

  if((numberOfUsers + 1) == users.length)
    res.json({ message: 'User Added Successfully!'});
  else
    res.json({ message: 'Unable to Add User. Sorry! Please try again.'});
}

router.findAllUsers = (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(users,null,5));
  // Return a JSON representation of our list
  res.json(users);
}

router.deleteUser = (req, res) => {
  //Delete the selected user based on its id
  var user = getByValue(users,req.params.id);
  var index = users.indexOf(user);

  var currentSize = users.length;
  users.splice(index, 1);

  if((currentSize - 1) == users.length)
    res.json({ message: 'User Deleted!'});
  else
    res.json({ message: 'Sorry that User ID is not on our system!'});
}

router.findUser = (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  var player = getUserById(users,req.params.id);

  if (player != null)
    res.send(JSON.stringify(player,null,5));
  else
    res.send('User NOT Found!! Please Try Again');
}
module.exports = router;
