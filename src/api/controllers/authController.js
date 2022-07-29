import bcrypt from 'bcrypt';
import User from '../models/User.js';
import validate from '../utils/validation.js';
import generateAuthToken from '../utils/generateToken.js';

class AuthController {
  static register = async (req, res) => {
    try {
      let { error } = validate.signup(req.body);
      if (error)
        return res.status(400).json({
          error: true,
          message: error.details[0].message,
        });

      // email check
      let { username, email, password, role } = await req.body;
      let ifEmail = await User.findOne({ email });
      if (ifEmail)
        return res
          .status(400)
          .json({ message: 'Email Exists register with another' });

      password = await bcrypt.hash(password, 10);
      let user = await User.create({ username, email, password, role });
      let newUser = await User.findOne({ _id: user._id });
      if (!user)
        return res.status(400).json({
          success: false,
          message: '❗ Error: User not created',
          user,
        });
      return res
        .status(201)
        .json({ success: true, message: 'User created', data: newUser });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Internal Server Error try again later',
        error: error.message,
      });
    }
  };

  static login = async (req, res) => {
    try {
      let { error } = validate.signin(req.body);
      if (error)
        return res.status(400).json({
          error: true,
          message: error.details[0].message,
        });

      const { email, password } = req.body;
      let user = await User.findOne({ email }).select('+password');
      if (!user)
        return res.status(401).json({ ok: false, message: 'Incorrect email or password' });
      let ifPassword = bcrypt.compareSync(password, user.password);
      if (!ifPassword)
        return res
          .status(401)
          .json({ ok: false, message: 'Incorrect email or password' });
      let payload = {
        id: user._id,
        firstname: user.firstname,
        lastname: user.lastname,
        role: user.role,
      };

      const token = await generateAuthToken(payload);
      if (!token) return console.log('token is not generated');
      // set cookeis
      res.cookie('token', token.refreshToken, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24,
        sameSite: 'None',
      });
      // send response
      return res.status(200).json({
        success: true,
        message: 'You are signedIn',
        accessToken: token.accessToken,
        refreshToken: token.refreshToken,
        role: user.role,
        username: user.username,
        userId: user._id,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        error: true,
        message: 'Internal Server Eror',
        reason: error.message,
      });
    }
  };
}

export default AuthController;
