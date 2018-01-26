const express = require('express');
const router = express.Router();

let pets = require('../json/pets')
const Pets = require('../db/models/').Pets

/* GET home page. */
router.get('/', (req, res) => {
    Pets.findAll().then(pets => {
        res.render('pets-index', { pets: pets });
    })
});

module.exports = router;
