const express = require('express');
const Agent = require("../models/agent");
const bcrypt = require("bcrypt")
const router = express.Router();

// POST
// ---- Route pour la création d'un produit ----
router.post('/api/agent/register', (req, res, next) => {

    const product = new Agent(
        req.query.numAgent,
        bcrypt.hash(req.query.password,10),
        req.query.grade
    );

    product.save()
        .then(product => res.status(201).json( { product }  ))
        .catch(error => res.status(400).json({ error } ))

});
router.post('/api/agent/register', (req, res, next) => {

    Product.findOne({
        _numAgent: req.params.numAgent,
        _password: bcrypt.compare(req.params.password, 10),
        _grade: req.params.grade
    })

});

// GET
// ---- Route pour récupérer tous les produits ----
router.get('/', (req, res, next) => {

    Product.find()
        .then(products => res.status(200).json({ products }))
        .catch(error => res.status(404).json({ error } ))

});

// GET
// ---- Route pour récupérer un produit précis ----
router.get('/:id', (req, res, next) => {

    Product.findOne({_id: req.params.id})
        .then(product => res.status(200).json({ product } ))
        .catch(error => res.status(404).json({ error } ))

});

// PUT
// ---- Route pour modifier un produit précis ----
router.put('/:id', (req, res, next) => {

    Product.updateOne({_id: req.params.id}, {...req.body , _id: req.params.id} )
        .then(() => res.status(200).json({ message : "Modified !" }))
        .catch(error => res.status(400).json({ error } ))

});

// DELETE
// ---- Route pour supprimer un produit précis ----
router.delete('/:id', (req, res, next) => {

    Product.deleteOne({_id: req.params.id})
        .then(() => res.status(200).json({ message: "Deleted !" }))
        .catch(error => res.status(400).json({ error } ))

});

module.exports = router;