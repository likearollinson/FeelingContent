const db = require("../connection");
const { User, Episode, WhatYaFeelin } = require("../../models");
const userData = require("./userSeeds.json");
const episodeData = require("./episodeSeeds.json");
const wyfData = require("./wyfSeeds.json")

db.once("open", async () => {
  await Episode.deleteMany();
  await User.deleteMany();
  await WhatYaFeelin.deleteMany();

  await User.create(userData);
  console.log("users seeded");

  await Episode.insertMany(episodeData);
  console.log("episodes seeded");

  await WhatYaFeelin.insertMany(wyfData);
  console.log("wyf seeded");

  process.exit();
});
