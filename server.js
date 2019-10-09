const express = require("express");
const knex = require('knex')

const knexConfig = require('./knexfile.js')
const db = knex(knexConfig.development)

const server = express();


server.use(express.json());

server.get('/', (req, res) => {
    db("cars")
      .then(cars => {
        res.status(200).json(cars);
      })
      .catch(error => {
        res.status(500).json({
          error: error,
          message: "These cars information could not be retrieved."
        });
      });
})

server.get("/:id",validateId, (req, res) => {
    const { id } = req.params;

  db("cars")
    .where({ id })
    .first()
    .then(car => {
      res.status(200).json(car);
    })
    .catch(error => {
      res.status(500).json({
        error: error,
        message: "This car information could not be retrieved."
      });
    });
});

server.post('/',validateCarInfo, (req, res) => {
    db("cars")
      .insert(req.body)
      .then(ids => {
        db("cars")
          .where({ id: ids[0] })
          .then(newCar => {
            res.status(201).json({ id: ids, newData: req.body });
          });
      })
      .catch(error => {
        res.status(500).json({
          error: error,
          message: "The car information could not be saved."
        });
      });
})

server.put("/:id",validateId, (req, res) => {
  db("cars")
    .where({ id: req.params.id })
    .update(req.body)
    .then(count => {
      res
        .status(200)
        .json({ count: count, id: req.params.id, updatedData: req.body });
    })
    .catch(error => {
      res.status(500).json({
        error: error,
        message: "This car information could not be modified."
      });
    });
});

server.delete("/:id", validateId, (req, res) => {
  db("cars")
    .where({ id: req.params.id })
    .del()
    .then(count => {
      res.status(200).json({
        count: count,
        message: `The data with ID: ${req.params.id} was removed`
      });
    })
    .catch(error => {
      res.status(500).json({
        error: error,
        message: "This car information could not be removed."
      });
    });
});

function validateCarInfo(req, res, next) {
  if (!req.body) {
    res.status(400).json({ message: "please provide the car info" });
  } else if (!req.body.VIN || !req.body.Make ||!req.body.Model || !req.body.Mileage) {
    res.status(400).json({ message: "missing required VIN, Make, Model, or/and Mileage" });
  } else {
    next();
  }
}

function validateId(req, res, next) {
  db.select("*")
    .from("cars")
    .where("id", "=", req.params.id)
    .first()
    .then(car => {
      if (car) {
        next();
      } else {
        res.status(400).json({ message: "invalid car id" });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
}

module.exports = server;
