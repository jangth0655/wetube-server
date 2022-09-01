import { Session } from "express-session";
import { Types } from "mongoose";

declare module "express-session" {
  export interface SessionData {
    user: DocumentType<any> | null;
    loggedIn: boolean;
  }
}
