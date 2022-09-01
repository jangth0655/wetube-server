import { model, Schema } from "mongoose";

export interface CommentSchema {
  _id: any;
  text: string;
  createdAt: Date;
  [key: string]: any;
}

const commentSchema = new Schema<CommentSchema>({
  text: { type: String, require: true },
  user: { type: Schema.Types.ObjectId, require: true, ref: "User" },
  video: { type: Schema.Types.ObjectId, require: true, ref: "Video" },
  createdAt: { type: Date },
});

const Comment = model("Comment", commentSchema);

export default Comment;
