const express = require('express');
const router = express.Router();
const Controller = require("../controllers/book.controller.js");
const bookController = new Controller();

router.get('/', function(req, res) {
  bookController.getAll(req, res);
});

router.get('/:id', function(req, res) {
  let id = req.params.id;
  bookController.getOne(id, req, res);
});

router.post('/', function(req, res) {
  bookController.save(req, res);
});

router.put('/:id', function(req, res) {
  let id = req.params.id;
  bookController.update(id, req, res);
});

router.delete('/:id', function(req, res) {
  let id = req.params.id;
  bookController.delete(id, req, res);
});

module.exports = router;
