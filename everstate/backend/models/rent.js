const mongoose = require("mongoose");
const rentSchema = new mongoose.Schema({
  slug: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  photo1: {
    type: String,
    required: true,
  },
  photo2: {
    type: String,
    required: true,
  },
  photo3: {
    type: String,
    required: true,
  },
  photo4: {
    type: String,
    required: true,
  },
  photo5: {
    type: String,
    required: true,
  },
  beds: {
    type: Number,
    required: true,
  },
  baths: {
    type: Number,
    required: true,
  },
  sqft: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  agent: {
    type: String,
    required: true,
  },
  building: {
    type: Array,
    required: true,
  },
  apartment: {
    type: Array,
    required: true,
  },
  
});
const Rent = mongoose.model("Rent", rentSchema);
module.exports = Rent;