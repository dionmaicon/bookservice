const Service = require("../services/book.service.js");
const Book = require("../models/book.model.js");
const bookService = null;

class BookController {
  constructor() {
      this.bookService = new Service();
  }

  save(req, res) {
    if (!req.body) {
        res.send({
            success: false,
            message: "Parâmetros não definidos."
        });
    }

    this.bookService.save(req.body)
      .then( response => {
        console.log(response);
        if(response.success == false ) {
          res.status(400).send(response);
        } else {
          res.status(201).send({
            success: true,
            message: "Livro inserido com sucesso."
          });
        }
      }).catch(err => {
        res.status(500).send({
          success: false,
          message: "Não foi possivel inserir o novo livro."
        });
      });
  }

  getAll(req, res) {
     this.bookService.getAll()
     .then( books => {
        res.status(200).send(books);
      }).catch( err => {
        res.status(500).send({
          success: false,
          message: "Não foram encontradas entradas."
        });
      });
  }

  getOne(id, req, res) {
    this.bookService.getOne(id).then(book => {
      res.status(200).send(book);
    }).catch(err => {
      res.status(500).send({
        success: false,
        message: "Livro não encontrado."
      });
    });
  }

  update(id, req, res) {
    this.bookService.update(id, req.body)
      .then( response => {
        if(response.success == false ) {
          res.status(400).send(response);
        } else  {
          res.status(200).send({
            success: true,
            message: "Livro alterado com sucesso."
          });
        }
      }).catch(err => {
        res.status(500).send({
          success: false,
          message: "Não foi possivel salvar as modificações."
        });
      });
  }

  delete(id, req, res) {
    this.bookService.delete(id)
    .then(book => {
      res.status(200).send({
        success: true,
        message: "Livro removido com sucesso."
      });
    }).catch(err => {
      res.status(500).send({
        success: false,
        message: "Não foi possível remover o livro informado."
      });
    });
  }
}

module.exports = BookController;
