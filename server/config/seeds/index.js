const db = require("../connection");
const { User, Podcast, Episode } = require("../../models");
const userData = require("./userSeeds.json");
const episodeData = require("./episodeSeeds.json");

db.once("open", async () => {
  await Episode.deleteMany();
  await User.deleteMany();

  console.log("podcasts seeded");

  await User.create(userData);

  console.log("users seeded");

  await Episode.insertMany(episodeData);
  console.log("episodes seeded");

  process.exit();
});
