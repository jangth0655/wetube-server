import { model, Schema, Model } from "mongoose";

interface VideoSchema {
  title: string;
  description: string;
  createAt: Date;
  hashtags: string[];
  meta: {
    views: number;
    rating: number;
  };
}

interface VideoModelMethod extends Model<VideoSchema> {
  formatHashtags: (hashtags: string) => string[];
}

const videoSchema = new Schema<VideoSchema, VideoModelMethod>({
  title: { type: String, required: true, trim: true, maxLength: 80 },
  description: { type: String, trim: true },
  createAt: { type: Date, required: true, default: Date.now() },
  hashtags: [{ type: String, trim: true }],
  meta: {
    views: { type: Number, default: 0 },
    rating: { type: Number, default: 0 },
  },
});

videoSchema.static("formatHashtags", function formatHashtags(hashtags: string) {
  return hashtags
    .split(",")
    .map((word) => (word.startsWith("#") ? word : `#${word}`));
});

const Video = model<VideoSchema, VideoModelMethod>("Video", videoSchema);

export default Video;
