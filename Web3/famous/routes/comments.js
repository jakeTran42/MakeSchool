const express = require('express');
const router = express.Router({mergeParams: true});

let comments = require('../json/comments')

// CREATE
router.post('/', (req, res) => {
    comments.unshift(req.body);

    res.redirect('/pets/0');
});

// DESTROY
router.delete('/:index', (req, res) => {
  res.redirect(`/pets/${req.params.id}`);
});



module.exports = router;
