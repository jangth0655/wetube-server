import { model, Schema, Document } from "mongoose";
import bcrypt from "bcrypt";
import Video, { VideoSchema } from "./Video";

interface UserSchema {
  email: string;
  username: string;
  password: string;
  name: string;
  location: string;
  socialOnly: boolean;
  avatarId: string;
  videos: VideoSchema[];
}

const userSchema = new Schema<UserSchema>({
  email: { type: String, require: true, unique: true, trim: true },
  username: { type: String, require: true, unique: true, trim: true },
  password: { type: String, require: false },
  name: { type: String, require: true, trim: true },
  location: { type: String, trim: true },
  socialOnly: { type: Boolean, default: false },
  avatarId: { type: String },
  videos: [{ type: Schema.Types.ObjectId, ref: "Video" }],
});

userSchema.pre("save", async function () {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 5);
  }
});

userSchema.pre<any>(
  "deleteOne",
  { document: false, query: true },
  async function (next) {
    const { _id } = this.getFilter();
    await Video.deleteMany({ user: _id });
    next();
  }
);

const User = model("User", userSchema);

export default User;
