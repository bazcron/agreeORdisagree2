let statements = require('../models/statements');
let express = require('express');
let router = express.Router();


router.findAll = (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(statements,null,5));
    // Return a JSON representation of our list
    res.json(statements);
}

function getByValue(array, id) {
    let result = array.filter(function (obj) {return obj.id == id;});
    return result ? result[0] : null; // or undefined
}

router.findOne = (req, res) => {

    res.setHeader('Content-Type', 'application/json');

    let statement = getByValue(statements,req.params.id);

    if (statement != null)
        res.send(JSON.stringify(statement,null,5));
    else
        res.send('That Statement is not here');
}

router.addStatement = (req, res) => {
    res.setHeader('Content-Type', 'application/json');

    let numberOfStatements = statements.length;
    let id = numberOfStatements+1;   // add one to number of statements to give new statement the next id

    statements.push({"id": id, "statement": req.body.statement, "agree": 0, "disagree": 0});

    if((numberOfStatements + 1) == statements.length)
        res.json({ message: 'Statement has been successfully Added!'});
    else
        res.json({ message: 'Sorry unable to add Statement'});
}

router.agreedWithStatement = (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    // Find the relevant statement based on the id passed in
    // Add 1 to agree
    let statement = getByValue(statements,req.params.id);

    if (statement != null) {
        statement.agree =1;
        res.json({status : 200, message : 'Successfully Agreed' , "Statement Updated" : statement });
    }
    else
        res.send('Error please try again!!');
}


router.disagreeWithStatement = (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    // Find the relevant statement based on the id passed in
    // Add 1 to disagree
    let statement = getByValue(statements,req.params.id);

    if (statement != null) {
        statement.disagree = 1;
        res.json({status : 200, message : 'Successfully Disagreed' , "Statement Updated" : statement });
    }
    else
        res.send('Error please try again!!');
}

router.deleteStatement = (req, res) => {
    //Delete the selected statement based on its id.
    let statement = getByValue(statements,req.params.id);
    let index = statements.indexOf(statement);

    let currentSize = statements.length;
    statements.splice(index, 1);

    if((currentSize - 1) == statements.length)
        res.json({ message: 'Statement Deleted!'});
    else
        res.json({ message: 'Sorry Statement Deletion was not possible!'});
}


module.exports = router;