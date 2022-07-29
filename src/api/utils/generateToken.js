import { config } from 'dotenv';
import jwt from 'jsonwebtoken';
import Token from '../models/userToken.js';

config();

const generateAuthToken = async (payload) => {
  try {
    const res = {
      accessToken: generateToken(payload, process.env.JWT_SECRET, '15m'),
      refreshToken: generateToken(
        payload,
        process.env.REFRESH_TOKEN_SECRET,
        '7d'
      ),
    };
    await checkToken(payload, res.refreshToken);
    return res
  } catch (error) {
    console.log(error.message);
  }
};

const checkToken = async (payload, token) => {
  const userToken = await Token.findOne({ user: payload.id });
  if (userToken) await userToken.remove();
//   userToken.token = token;
//   userToken.save();
  await new Token({ user: payload.id, token: token }).save();
};

const generateToken = (payload, secret, expiresIn) => {
  return jwt.sign(payload, secret, { expiresIn: expiresIn });
};

export default generateAuthToken;
