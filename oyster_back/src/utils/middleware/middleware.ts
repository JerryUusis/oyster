import { Request, Response, NextFunction } from "express";

const unknownEndpoint = (_request: Request, response: Response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

const errorHandler = (
  error: any,
  _request: Request,
  response: Response,
  next: NextFunction
) => {
  // auth error codes
  //https://firebase.google.com/docs/auth/admin/errors
  if (error.code?.startsWith("auth/")) {
    switch (error.code) {
      case "auth/invalid-email":
        return response.status(400).json({ error: "invalid email format" });
      case "auth/user-not-found":
        return response.status(404).json({ error: "user not found" });
      case "auth/email-already-exists":
        return response.status(400).json({ error: "email already in use" });
      case "auth/invalid-password":
        return response.status(400).json({ error: "invalid password" });
      case "auth/weak-password":
        return response.status(400).json({ error: "weak password" });
      default:
        return response.status(500).json({ error: "internal server error" });
    }
  }
  next(error);
};

export { unknownEndpoint, errorHandler };
