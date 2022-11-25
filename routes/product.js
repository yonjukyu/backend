const express = require('express');
const Product = require("../models/product");

const router = express.Router();

// POST
// ---- Route pour la création d'un produit ----
router.post('/', (req, res, next) => {

    const product = new Product({
        ...req.body
    });

    product.save()
        .then( product => res.status(201).json( { product }  ))
        .catch(error => res.status(400).json({ error } ))

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