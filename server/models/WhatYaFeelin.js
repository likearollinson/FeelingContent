const mongoose = require("mongoose");

const { Schema } = require("mongoose");

const whatYaFeelinSchema = new Schema({
  episodeNumber: {
    type: Number,
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
  michaelWidget: {
    type: String,
  },
  bradWidget: {
    type: String,
  },
  michaelMichaelReview: {
    type: String,
  },
  michaelBradReview: {
    type: String,
  },
  bradMichaelReview: {
    type: String,
  },
  bradBradReview: {
    type: String,
  },
  michaelMichaelCups: {
    type: String,
  },
  michaelBradCups: {
    type: String,
  },
  bradMichaelCups: {
    type: String,
  },
  bradBradCups: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const WhatYaFeelin = mongoose.model("WhatYaFeelin", whatYaFeelinSchema);

module.exports = WhatYaFeelin;
