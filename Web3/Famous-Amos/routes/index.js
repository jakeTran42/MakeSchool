const express = require('express');
const router = express.Router();

// let pets = require('../json/pets')
const Pet = require('../db/models').Pet

/* GET home page. */
router.get('/', (req, res) => {
    req.flash('info', 'Welcome');
    Pet.findAll().then(pets => {
        res.render('pets-index', { pets: pets });
    })
});

module.exports = router;
