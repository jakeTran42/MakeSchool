const express = require('express');
const router = express.Router();

// let pets = require('../json/pets')
const Pet = require('../db/models').Pet
const Comment = require('../db/models').Comment

/* GET home page. */
// router.get('/', (req, res) => {
//     Pet.findAll().then(pets => {
//         res.render('pets-index', { pets: pets });
//     })
// });

router.get('/', (req, res) => {
    let limit = 6;
    let offset = 0;
    Pet.findAndCountAll().then((pet) => {
        let page = req.query.page;
        let pages = Math.ceil(pet.count / limit);
        let offset = limit * (page - 1);
        Pet.findAll({
            limit: limit,
            offset: offset,
            $sort: { id: 1 }
        }).then((pets) => {
            res.render('pets-index', { pets, count: pet.count, pages });
        }).catch((err) => {
            res.send(err)
        })
    }).catch(function (error) {
        res.status(500).send('Internal Server Error');
        res.render('/500.html')
    })
})

router.get('/search', (req, res) => {
    Pet.findAll(
        {
        where: {
            name: req.query.name
        }
    }).then((pets) => {
        res.render('pets-index', { pets, name: req.query.name });
    })
})


module.exports = router;
