import "dotenv/config";
import { Passport } from "passport";
import {
  IStrategyOptionsWithRequest,
  Strategy as LocalStrategy,
  VerifyFunctionWithRequest,
} from "passport-local";
import {
  Strategy as JWTStrategy,
  ExtractJwt,
  StrategyOptionsWithoutRequest,
  VerifyCallback,
} from "passport-jwt";
import {
  findById as findByUserId,
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

// JWT strategy
const jwtOptions: StrategyOptionsWithoutRequest = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Bearer <token>
  secretOrKey: String(process.env.JWT_PRIVATE_KEY),
};

// runs after validating jwt
// double check if user still exists in our record
const jwtVerifyCallback: VerifyCallback = async (payload, done) => {
  try {
    const userId = Number(payload.id);

    if (isNaN(userId)) {
      return done(null, false, { message: "Invalid user id." });
    }

    const user = await findByUserId(userId);

    if (!user) {
      return done(null, false, { message: "User does not exist anymore." });
    }

    return done(null, user);
  } catch (err) {
    return done(err, false);
  }
};

passport.use(new JWTStrategy(jwtOptions, jwtVerifyCallback));

export default passport;
