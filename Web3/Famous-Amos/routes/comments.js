const express = require('express');
const router = express.Router({mergeParams: true});

let comments = require('../json/comments')
const Comment = require('../db/models').Comment
const Pet = require('../db/models').Pet

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
        content: req.body.content,
        PetId: req.params.petId
    }).then(() => {
        req.flash('success', 'Comment created');
        res.redirect(`/pets/${req.params.petId}`);
    }).catch((err) => {
        req.flash("caution", "Cannot Create Comment");
        res.send(err)
    })
})

// DESTROY
router.delete('/:index', (req, res) => {
    Comment.destroy({
        where: { id: req.params.index }
    }).then(() => {
        req.flash('success', 'Successfully Deleted Comment')
        res.redirect(`/pets/${req.params.petId}`);
    }).catch((err) => {
        req.flash('caution', 'Something went wrong while deleting comment')
        res.send(err)
    })
});




module.exports = router;
