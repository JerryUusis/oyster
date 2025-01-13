import { Request, Response, NextFunction } from "express";
import { auth } from "../../services/firebaseAdmin";

const tokenExtractor = (
  request: Request,
  _response: Response,
  next: NextFunction
) => {
  const authorizationHeader = request.get("authorization");

  if (authorizationHeader?.startsWith("Bearer ")) {
    request.idToken = authorizationHeader.replace("Bearer ", "");
  }
  next();
};

const verifyIdToken = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { idToken } = request;
  try {
    if (!idToken) {
      return response.status(400).json({ error: "missing id token" });
    }
    const decodedIdToken = await auth.verifyIdToken(idToken);
    request.decodedIdToken = decodedIdToken;
    next();
  } catch (error) {
    return response.status(401).json({ error: "invalid or expired ID-token" });
  }
};

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

export { tokenExtractor, unknownEndpoint, errorHandler, verifyIdToken };
