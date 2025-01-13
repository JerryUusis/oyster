import { Request } from "express";
import { DecodedIdToken } from "firebase-admin/auth";

// Augment express Request interface to have idToken property 
declare module "express-serve-static-core" {
  interface Request {
    idToken?: string;
    decodedIdToken: DecodedIdToken
  }
}

interface UserInterface {
  email: string;
  password: string;
  username: string;
  location: string;
  languages: string[];
  theme: string;
}

export { UserInterface };
