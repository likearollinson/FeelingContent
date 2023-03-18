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

    //   episode: async (parent, args) => {
    //     try {
    //       const episodeData = await Episode.findOne({
    //         _id: args._id,
    //       }).populate("addedEpisode");
    //       return episodeData;
    //     } catch (err) {
    //       console.log(err);
    //     }
    //   },
    // },


    user: async (parent, { email }) => {
      return await User.findOne({ email });
    },
    users: async () => {
      return await User.find();
    },
    me: async (parent, args, { user }) => {
      if (!user) {
        throw new AuthenticationError("You are not logged in.");
      }
      return await User.findById(user._id);
    },
    comments: async (parent, { username }) => {
      const user = await User.findOne({ username });
      if (!user) {
        throw new Error("User not found.");
      }
      return await Comment.find({ createdBy: user._id });
    },
    episode: async (parent, { _id }) => {
      return await Episode.findById(_id);
    },
    episodes: async () => {
      return await Episode.find();
    },
    addedEpisode: async (parent, args, { user }) => {
      if (!user) {
        throw new AuthenticationError("You are not logged in.");
      }
      return await Episode.findOne({ _id: user.addedEpisode });
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

    // addEpisode: async (parent, args, context) => {
    //   if (context.user) {
    //     try {
    //       // console.log(args.input);
    //       // console.log(context.user);
    //       const newEpisode = await Episode.create(args.input);
    //       // console.log(newEpisode);
    //       // const user = await User.findOne({ _id: context.user._id });
    //       const updateEpisode = await Episode.findOneAndUpdate(
    //         { _id: user.addedEpisode },
    //         { $push: { episodes: newEpisode._id } },
    //         { new: true, runValidators: true }
    //       );
    //       console.log(updateEpisode);
    //     } catch (err) {
    //       console.log(err);
    //     }
    //   }
    // },

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
    addEpisode: async (parent, { input }, context) => {
      if (context.user) {
        const episode = await Episode.create({ ...input });
        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { addedEpisode: episode._id } }
        );
        return episode;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    addComment: async (parent, { input }, context) => {
      if (context.user) {
        const comment = await Comment.create({
          ...input,
          createdBy: context.user._id,
        });
        await Episode.findOneAndUpdate(
          { _id: input.episodeId },
          { $addToSet: { comments: comment._id } }
        );
        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { comments: comment._id } }
        );
        return User.findOne({ _id: context.user._id }).populate('comments');
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    removeComment: async (_, { _id }) => {
      try {
        const deletedComment = await Comment.findByIdAndDelete(_id);
        if (!deletedComment) {
          throw new Error('Comment not found');
        }
        return deletedComment;
      } catch (err) {
        console.error(err);
        throw new Error('Failed to remove comment');
      }
    },
  },
};


module.exports = resolvers;
