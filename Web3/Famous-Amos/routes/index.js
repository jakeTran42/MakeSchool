const express = require('express');
const router = express.Router();

let pets = require('../json/pets')

/* GET home page. */
router.get('/', (req, res) => {
  res.render('pets-index', { pets: pets });
});

module.exports = router;
