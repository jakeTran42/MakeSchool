const express = require('express');
const router = express.Router();

// let pets = require('../json/pets')
let comments = require('../json/comments')
// const db = required('../db/models')
const Pet = require('../db/models').Pet
const Comment = require('../db/models').Comment


// // INDEX
// router.get('/', (req, res) => {
//   res.send(pets);
// });

// NEW
router.get('/new', (req, res) => {
  res.render('pets-new');
});

// SHOW
router.get('/:id', (req, res) => {
    Pet.findById(req.params.id, {
        include: {
            model: Comment
        }
    }).then((pet) => {
        res.render('pets-show', { pet: pet });
    }).catch((err) => {
        console.log(err)
    })
});

// CREATE
router.post('/', (req, res) => {
    // pets.unshift(req.body);
    Pet.create(req.body).then(() => {
        res.redirect('/');
    })
});

// EDIT
router.get('/:id/edit', (req, res) => {
    Pet.findById(req.params.id).then((pet) =>{
        console.log(pet.id)
        res.render('pets-edit', { pet: pet })
    })
});

// UPDATE
router.put('/:id', (req, res) => {
    console.log('Hello')
    Pet.findById(req.params.id).then((pet) => {
        pet.update(req.body);
    }).then(() =>{
        res.redirect(`/pets/${req.params.id}`)
    }).catch((err) => {
        console.log(err)
    })
});

// DESTROY
router.delete('/:id', (req, res) => {
    Pet.findById(req.params.id).then((pet) => {
        return pet.destroy(pet);
    }).then(() => {
        res.redirect('/');
    }).catch((err) => {
        console.log(err)
    })
});


module.exports = router;
