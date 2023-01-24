const express = require('express');
const Agent = require("../models/agent");
const bcrypt = require("bcrypt")
const router = express.Router();
const jwt = require("jsonwebtoken");
const Intervention = require("../models/intervention")
// POST
// ---- Route pour la création d'un produit ----
router.post('/api/agent/register', (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const agent = new Agent(
                {
                    grade: req.body.grade,
                    numAgent: req.body.numAgent,
                    password: hash
                }
            );
            agent.save()
                .then(() => res.status(201).json({numAgent: req.body.numAgent}))
                .catch(error => res.status(400).json({error}));

        });
});
router.post('/api/agent/login', (req, res, next) => {

    Agent.findOne({
        _numAgent: req.params.numAgent,
        _password: bcrypt.compare(req.params.password, 10),
        _grade: req.params.grade
    }).then(() => res.status(200).json({
        numAgent: req.body.numAgent,
        token: jwt.sign(
            {numAgent: req.body.numAgent},
            'AIZEDFHAIHFUE',
            {expireIn: '24h'}
        )
    }))
        .catch(() => res.status(401).json({message: "erreur dans la paire mdp/login"}))

});

router.put('/api/agent/update', (req, res, next) => {

    Agent.updateOne({_numAgent: req.body.numAgent}, {...req.body} )
        .then(() => res.status(200).json({ message : "Agent modifié !" }))
        .catch(error => res.status(400).json({ message: "Pas autorisé" } ))

});
router.post('/api/intervention', (req, res, next) => {
    const intervention = new Intervention(
        {
            ...req.body
        }
    );
    intervention.save()
        .then(() => res.status(201).json({message: "intervention enregistrée"}))
        .catch(error => res.status(400).json({error}));
});


router.get('/api/intervention', (req, res, next) => {

    Intervention.find({_numAgent: req.body.numAgent})
        .then(products => res.status(200).json({products}))
        .catch(error => res.status(404).json({error}))

});

router.get('/api/intervention/all', (req, res, next) => {

    Intervention.find()
        .then(products => res.status(200).json({products}))
        .catch(error => res.status(404).json({error}))

});

router.delete('/api/intervention/:id', (req, res, next) => {

    Intervention.deleteOne({_id: req.params.id, numAgent: req.body.numAgent})
        .then(() => res.status(200).json({ message: "Intervention suprimée !" }))
        .catch(error => res.status(400).json({ message: "Ce n'est pas votre intervention" } ))

});
module.exports = router;