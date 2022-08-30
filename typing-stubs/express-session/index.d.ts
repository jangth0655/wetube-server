import { Session } from "express-session";
import { Types } from "mongoose";

declare module "express-session" {
  export interface SessionData {
    user: DocumentType<User> | null;
    loggedIn: boolean;
  }
}
