import { Response } from "express";

const assertAuthToken = (res: Response): string => {
  const token = res.locals.token;

  if (!token) {
    throw new Error("Authentication token not found in response.");
  }

  if (typeof token !== "string") {
    throw new Error(`Expecting a string token but recieved ${typeof token}.`);
  }

  return token;
};

export default assertAuthToken;
