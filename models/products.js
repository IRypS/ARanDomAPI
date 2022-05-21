const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');

const ProductScheme = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    price: {
      type: Number,
    },
    description: {
      type: String,
    }
  },
  {
    timestamps: true,
    versionKey: false,
  }
);


ProductScheme.plugin(mongooseDelete, { overrideMethods: true, deleteAt: true } );
//ProductScheme.plugin(mongooseDelete, { overrideMethods: 'all' } );
module.exports = mongoose.model('products', ProductScheme);