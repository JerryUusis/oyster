import { Request } from "express";

// Augment express Request interface to have idToken property 
declare module "express-serve-static-core" {
  interface Request {
    idToken?: string;
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
