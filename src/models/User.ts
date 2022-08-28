import { model, Schema, Model } from "mongoose";
import bcrypt from "bcrypt";

interface UserSchema {
  email: string;
  username: string;
  password: string;
  name: string;
  location: string;
  socialOnly: boolean;
  avatarUrl: string;
}

const userSchema = new Schema<UserSchema>({
  email: { type: String, require: true, unique: true, trim: true },
  username: { type: String, require: true, unique: true, trim: true },
  password: { type: String, require: false },
  name: { type: String, require: true, trim: true },
  location: { type: String, trim: true },
  socialOnly: { type: Boolean, default: false },
  avatarUrl: { type: String },
});

userSchema.pre("save", async function () {
  this.password = await bcrypt.hash(this.password, 5);
});

const User = model("User", userSchema);

export default User;
