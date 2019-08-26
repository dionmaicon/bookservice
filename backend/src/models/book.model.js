const mongoose = require('mongoose');
require('mongoose-long')(mongoose);
const ISBNDOC = require( 'isbn-validate' );

const BookSchema = mongoose.Schema({
    titulo: {
      type: String,
      required: true
    },
    ISBN: {
      type: String,
      required: true,
      validate: {
        validator: function(value) {
          return ISBNDOC.Validate(value); 
        }
      }
    },
    autor: {
      type: String,
      required: true
    },
    editora: {
      type: String,
      required: true
    },
    ano: {
      type: Number,
      required: true
    },
    idioma: {
      type: String
    },
    peso: {
      type: Number
    },
    dimensoes: {
      comprimento: { type: Number},
      largura: { type: Number},
      altura: { type:Number},
    }
}, {
    timestamps: true
});

BookSchema.set('collection', 'books');

BookSchema.set('toJSON', {
     transform: function (doc, ret, options) {
         ret.id = ret._id;
         delete ret._id;
         delete ret.__v;
     }
});

module.exports = mongoose.model('Book', BookSchema, 'books');
