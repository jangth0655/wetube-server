import { model, Schema, Model } from "mongoose";
import { CommentSchema } from "./Comment";

export interface VideoSchema {
  _id: any;
  url: string;
  title: string;
  description: string;
  createAt: Date;
  hashtags: string[];
  meta: {
    view: number;
  };
  user: Schema.Types.ObjectId;
  comments: CommentSchema[];
}

interface VideoModelMethod extends Model<VideoSchema> {
  formatHashtags: (hashtags: string) => string[];
}

const videoSchema = new Schema<VideoSchema, VideoModelMethod>({
  url: { type: String, required: true },
  title: { type: String, required: true, trim: true, maxLength: 80 },
  description: { type: String, trim: true },
  createAt: { type: Date, required: true, default: Date.now() },
  hashtags: [{ type: String, trim: true }],
  user: { type: Schema.Types.ObjectId, required: true, ref: "User" },
  meta: {
    view: { type: Number, required: true, default: 0 },
  },
  comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
});

videoSchema.static("formatHashtags", function formatHashtags(hashtags: string) {
  return hashtags
    .split(",")
    .map((word) => (word.startsWith("#") ? word : `#${word}`));
});

const Video = model<VideoSchema, VideoModelMethod>("Video", videoSchema);

export default Video;
