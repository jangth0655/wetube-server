import session from "express-session";
import { Types } from "mongoose";

declare module "express-session" {
  export interface SessionData {
    user: {
      _id: Types.ObjectId;
      email: string;
      username: string;
      password: string;
      name: string;
      location: string;
      socialOnly: boolean;
      avatarUrl: string;
    } | null;
    loggedIn: boolean;
  }
}
