import { DoneCallback, Passport } from "passport";
import {
  IStrategyOptionsWithRequest,
  Strategy as LocalStrategy,
  VerifyFunctionWithRequest,
} from "passport-local";
import {
  findByEmail as findUserByEmail,
  getIsPasswordMatching,
} from "../models/user.model";

const passport = new Passport();

// setup for local strategy
const customFields: IStrategyOptionsWithRequest = {
  usernameField: "email",
  passwordField: "password",
  session: false,
  passReqToCallback: true,
};

const verifyCallback: VerifyFunctionWithRequest = async (
  _req,
  email,
  password,
  done,
) => {
  try {
    const user = await findUserByEmail(email);

    if (!user) {
      return done(null, false, { message: "Email not registered." });
    }

    const isPasswordMatching = await getIsPasswordMatching(user.id, password);

    if (!isPasswordMatching) {
      return done(null, false, { message: "Incorrect password." });
    }

    return done(null, user, { message: "User authentication successful." });
  } catch (error) {
    if (error instanceof Error) {
      return done(error, false, { message: error.message });
    }

    return done(error, false, {
      message: "An unknown error has occured while authencating the user.",
    });
  }
};

passport.use(new LocalStrategy(customFields, verifyCallback));

export default passport;
