const mongoose = require("mongoose");

// Schema Types list: https://mongoosejs.com/docs/schematypes.html
const PetSchema = new mongoose.Schema( // mongoDB är utan schema men man vill ändå ha ett schema vilket man får från mongoose som har inbyggda funktioner som sort, find etc.
  {
    name: String,
    age: Number,
    species: String,
    mammal: Boolean,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Pet", PetSchema);
