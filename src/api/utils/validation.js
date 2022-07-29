import joi from 'joi';
import passwordComplexity from 'joi-password-complexity';

class Validation {
  static signup = (body) => {
    const schema = joi.object({
      username: joi.string().required().label('User Name'),
      email: joi.string().required().label('Email'),
      role: joi.number().label('Role'),
      password: passwordComplexity().required().label('Password'),
    });
    return schema.validate(body);
  };
  static signin = (body) => {
    const schema = joi.object({
      email: joi.string().required().label('Email'),
      password: passwordComplexity().required().label('Password'),
    });
    return schema.validate(body);
  };
}

export default Validation;
