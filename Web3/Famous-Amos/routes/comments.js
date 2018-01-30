const express = require('express');
const router = express.Router({mergeParams: true});

let comments = require('../json/comments')
const Comment = require('../db/models').Comment
const Pets = require('../db/models').Pet

// CREATE
// router.post('/', (req, res) => {
//     let comment = Comment.create(req.body)
//     comment.petId = req.params.petId
//
//     comment.save().then(=> {
//         res.redirect(`/pets/${comment.petId}`);
//     }).catch(err, ()=> {
//         console.log(err);
//     });
// });

router.post('/', (req,res) => {
    Comment.create({
        body: req.body,
        PetId: req.params.petId
    }).then(() => {
        res.redirect(`/pets/${req.params.petId}`);
    }).catch((err) => {
        res.send(err)
    })
})

// DESTROY
router.delete('/:index', (req, res) => {
    Comment.destroy({
        where: { id: req.params.index }
    }).then(() => {
        res.redirect(`/pets/${req.params.id}`);
    }).catch((err) => {
        res.send(err)
    })
});



module.exports = router;
