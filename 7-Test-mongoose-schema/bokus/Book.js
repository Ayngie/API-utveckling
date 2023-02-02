const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    author: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 500,
    },
    ISBN: {
      type: String,
      required: true,
      unique: true,
    },
    price: {
      type: Number,
      required: true,
    },
    format: {
      type: String,
      enum: ["Inbunden", "Pocket", "Häftad", "E-bok", "Ljudbok"],
      required: true,
    },
    language: {
      type: String,
      required: true,
    },
    numbersOfPages: {
      type: Number,
      required: true,
    },
    edition: {
      type: Number,
    },
    translator: {
      type: String,
    },
    originalTitle: {
      type: String,
    },
    readingAge: {
      type: Number,
    },
    illustrator: {
      type: String,
    },
    photographer: {
      type: String,
    },
    publisher: {
      type: String,
    },
    publicationDate: {
      type: String,
    },
    dimensions: {
      type: String,
    },
    weight: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Book", BookSchema);
