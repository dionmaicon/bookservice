const Book = require("../models/book.model.js");
var faker = require('faker');

const ISBN = [
  '9789446125447',
  '9789446125447',
  '9789446125447',
  '9789446125447',
];

class BookMock {
  constructor() {

  }

  createBooks() {
    for (var i = 0; i < ISBN.length; i++) {
      let book = new Book(
      {
          "dimensoes": {
              "comprimento": 25,
              "largura": 1.2,
              "altura": 30
          },
          "titulo": faker.name.title(),
          "ISBN": ISBN[i],
          "autor": faker.name.findName(),
          "editora": faker.name.lastName(),
          "ano": Number(2016) + Number(i),
          "idioma": "Portugues",
          "peso": 1.2,
      });

      book.save().then(response => {
        console.log(response);
      }).catch(err => {
        console.log(err);
      });
    }
  }

}

module.exports = BookMock;
