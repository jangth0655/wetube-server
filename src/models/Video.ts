import mongoose from "mongoose";

interface VideoSchema {
  title: string;
  description: string;
  createAt: string;
  hashtags: string[];
  meta: {
    views: number;
    rating: number;
  };
}

const videoSchema = new mongoose.Schema<VideoSchema>({
  title: String,
  description: String,
  createAt: Date,
  hashtags: [{ type: String }],
  meta: {
    views: Number,
    rating: Number,
  },
});

const Video = mongoose.model<VideoSchema>("Video", videoSchema);

export default Video;
