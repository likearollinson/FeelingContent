const { AuthenticationError } = require("apollo-server-express");
const { User, Episode } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    // me: async (parent, args, context) => {
    //   if (context.user) {
    //     try {
    //       const userData = await User.findOne({
    //         _id: context.user._id,
    //       })
    //         .select("-__v-password")
    //         .populate({
    //           path: "addedPodcast",
    //           populate: "episodes",
    //         });

    //       return userData;
    //     } catch (err) {
    //       console.log(err);
    //     }
    //   }
    //   throw new AuthenticationError("You need to be logged in!");
    // },
    // episode: async () => {
    //   return await Episode.find().getPopulatedPaths("episode");
    // },

    episode: async (parent, args) => {
      try {
        const episodeData = await Episode.findOne({
          _id: args._id,
        }).populate("episode");
        return episodeData;
      } catch (err) {
        console.log(err);
      }
    },
  },
  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },

    updateUser: async (parent, args, context) => {
      if (context.user) {
        return await User.findByIdAndUpdate(context.user._id, args, {
          new: true,
        });
      }

      throw new AuthenticationError("Not logged in");
    },

    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = signToken(user);

      return { token, user };
    },

    addEpisode: async (parent, args, context) => {
      if (context.user) {
        try {
          // console.log(args.input);
          // console.log(context.user);
          const newEpisode = await Episode.create(args.input);
          // console.log(newEpisode);
          // const user = await User.findOne({ _id: context.user._id });
          const updateEpisode = await Episode.findOneAndUpdate(
            { _id: user.addedEpisode },
            { $push: { episodes: newEpisode._id } },
            { new: true, runValidators: true }
          );
          console.log(updateEpisode);
        } catch (err) {
          console.log(err);
        }
      }
    },

    // addComment: async (parent, args, context) => {
    //   if (context.user) {
    //     try {
    //       const comment = await User.findByIdAndUpdate(
    //         args.podcastId,
    //         { $push: { comments: args.text } },
    //         { new: true }
    //       );

    //       return comment;
    //     } catch (err) {
    //       console.log(err);
    //     }
    //   }
    //   throw new AuthenticationError("Not logged in");
    // },
  },
};


module.exports = resolvers;
