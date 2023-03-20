const mongoose = require("mongoose");

const { Schema } = require("mongoose");

const episodeSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  michaelWYF: {
    type: String,
  },
  bradWYF: {
    type: String,
  },
  bradArt: {
    type: String,
  },
  michaelArt: {
    type: String,
  },
  widget: {
    type: String,
  },
  episodeNumber: {
    type: Number,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Episode = mongoose.model("Episode", episodeSchema);

module.exports = Episode;
