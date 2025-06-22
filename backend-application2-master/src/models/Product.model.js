import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'El título es requerido.'],
      trim: true,
      minlength: [3, 'El título debe tener al menos 3 caracteres.']
    },
    description: {
      type: String,
      trim: true,
      maxlength: [500, 'La descripción no debe superar los 500 caracteres.']
    },
    price: {
      type: Number,
      required: [true, 'El precio es requerido.'],
      min: [0, 'El precio no puede ser negativo.']
    },
    code: {
      type: String,
      required: [true, 'El código es requerido.'],
      unique: true,
      trim: true,
      index: true
    },
    stock: {
      type: Number,
      required: [true, 'El stock es requerido.'],
      min: [0, 'El stock no puede ser negativo.']
    },
    status: {
      type: Boolean,
      default: true
    },
    category: {
      type: String,
      trim: true
    },
    thumbnails: {
      type: [String],
      validate: {
        validator: function (arr) {
          return Array.isArray(arr) && arr.every((url) => typeof url === 'string');
        },
        message: 'Los thumbnails deben ser URLs de imagen en formato texto.'
      }
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

export const ProductModel = mongoose.model('Product', productSchema);
