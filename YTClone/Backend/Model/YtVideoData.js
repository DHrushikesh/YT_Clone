import mongoose from 'mongoose';

const { Schema } = mongoose;

const CommentSchema = new Schema({
  user: {
    type: String,
    required: true,
    description: "The user who made the comment."
  },
  text: {
    type: String,
    required: true,
    description: "The text of the comment."
  },
  date: {
    type: Date,
    default: Date.now,
    description: "The date the comment was made."
  }
});

const YtVideoDataSchema = new Schema({
  title: {
    type: String,
    required: true,
    description: "The title of the video."
  },
  thumbnailUrl: {
    type: String,
    required: true,
    description: "A URL to the video thumbnail image."
  },
  channelName: {
    type: String,
    required: true,
    description: "The channel's unique identifier."
  },
  YTURl:{
    type: String,
    required: true,
    description: "The URL of the video."
  },
  views: {
    type: Number,
    required: true,
    description: "The number of views the video has."
  },
  likes: {
    type: Number,
    required: true,
    description: "The number of likes the video has."
  },
  dislikes: {
    type: Number,
    required: true,
    description: "The number of dislikes the video has."
  },
  genre: {
    type: String,
    required: true,
    description: "The genre of the video."
  },
  comments: {
    type: [CommentSchema],
    description: "An array of comments on the video."
  },
  uploadDate: {
    type: Date,
    required: true,
    description: "The date the video was uploaded."
  }
});

const YtVideoData = mongoose.model('YtVideoData', YtVideoDataSchema);

export default YtVideoData;