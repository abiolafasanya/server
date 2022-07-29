import bcrypt from 'bcrypt';
import LocalStrategy from 'passport-local';
// import googleUser from '../database/models/GoogleUser.js';
import GoogleStrategy from 'passport-google-oauth2';
// import passport from 'passport'

class Passport {
  serializeAndDeserializeUser = (passport) => {
    passport.serializeUser((user, done) => done(null, user.id));
    this.passport.deserializeUser((id, done) => {
      googleUser.findById(id, (err, user) => done(err, user));
    });
  };

  static local = async (passport) => {
    const authenticate = async (username, password, done) => {
      const user = await getUserbyUsername(username);
      if (user == null) {
        console.log({ message: 'no user with this username' });
        return done(null, false, { message: 'no user with this username' });
      }
      try {
        if (bcrypt.compareSync(password, user.password)) {
          return done(null, user);
        } else {
          console.log({ message: 'password incorrect' });
          return done(null, false, { message: 'password incorrect' });
        }
      } catch (err) {
        return done(err);
      }
    };

    passport.use(
      new LocalStrategy(
        { usernameField: 'username' || 'user_id' },
        authenticate
      )
    );

    serializeAndDeserializeUser(passport);
  };

  static google = async (
    passport,
    accessToken,
    refreshToken,
    profile,
    done
  ) => {
    passport = this.passport;

    GoogleStrategy.Strategy;
    const authenticate = async (accessToken, refreshToken, profile, done) => {
      console.log(profile);
      const newUser = {
        googleId: profile.id,
        displayName: profile.displayName,
        firstName: profile.name.givenName,
        lastName: profile.name.familyName,
        image: profile.photos[0].value,
        email: profile.email,
      };

      try {
        let user = await googleUser.findOne({ googleId: profile.id });
        if (user) {
          done(null, user);
        } else {
          user = await googleUser.create(newUser);
          done(null, user);
        }
      } catch (err) {
        console.error(err.message);
      }
    };
    passport.use(
      new GoogleStrategy(
        {
          clientID: config.google_id,
          clientSecret: config.google_secret,
          callbackURL: 'http://localhost:3000/auth/google/callback',
          // passReqToCallback: true,
        },
        authenticate
      )
    );

    serializeAndDeserializeUser(passport);
  };
}

export default Passport;
