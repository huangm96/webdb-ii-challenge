const express = require("express");
const knex = require('knex')

const knexConfig = require('./knexfile.js')
const db = knex(knexConfig.development)

const server = express();


server.use(express.json());

server.get('/', (req, res) => {
    db('cars').then(cars => {
        res.status(200).json(cars)
    }).catch(error => {
        res.status(500).json(error)
    })
})

server.get("/:id", (req, res) => {
    const { id } = req.params;

  db("cars").where({id}).first()
    .then(car => {
      res.status(200).json(car);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

server.post('/', (req, res) => {
    db('cars').insert(req.body).then(ids => {
        db('cars').where({ id: ids[0] }).then(newCar => {
            res.status(201).json(req.body)
        })
    }).catch(error => {
        res.status(500).json(error)
    })
})
module.exports = server;
