const Book = require("../models/book.model.js");

class BookService {
  constructor() {
  }

  async getAll() {
    return await Book.find()
      .then( books => books).catch(err => {
      return {
        success: false,
        message : "Algum erro ocorreu ao enquanto tentava buscar os livros."
      }
    });
  }
  
  async getOne(id){
    let error = null;
    let book = null;

    await Book.findById(id)
      .then( response => {
        book = response;
      }).catch(err => {
        error = err.message;
      });

      if (error != null) {
        return {
            success: false,
            message: error,
        };
      } else {
        return book;
      }
  }

  async save(params) {
    let book = new Book(params);
    let error = null;

    await book.save()
      .then( response => {
        book = response;
      }).catch( err => {
        error = err.message;
      });

    if (error != null) {
      return {
          success: false,
          message: error,
      };
    } else {
      return book;
    }
  }

  async update(id, params) {

    let error = null;
    let book = null;

    await Book.findByIdAndUpdate(id, params, {new: true})
      .then(response => {
        book = response;
      }).catch(err => {
        error = err.message;
      });

    if (error != null) {
      return {
          success: false,
          message: error,
      };
    } else {
      return book;
    }

  }

  async delete(id) {
    return await Book.findByIdAndRemove(id)
      .then( book => {
        return book;
      })
      .catch( err => {
        return err;
      });
  }

}

module.exports =  BookService;
