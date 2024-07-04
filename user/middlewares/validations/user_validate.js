const { body, validationResult } = require("express-validator");
const DefaultResponse = require("../../helpers/generate_response");

const validateUser = [
    body("name")
      .exists()
      .withMessage("parameter name is required")
      .bail()
      .isString()
      .withMessage('parameter name must be string')
      .bail()
      .notEmpty()
      .withMessage('parameter name cannot empty'),
    body("username")
      .exists()
      .withMessage("parameter username is required")
      .bail()
      .isString()
      .withMessage('parameter username must be string')
      .bail()
      .notEmpty()
      .withMessage('parameter username cannot empty')
      .bail()
      .isLength({min:5})
      .withMessage('minimum character in parameter username is 5'),
    body("password")
      .exists()
      .withMessage("parameter password is required")
      .bail()
      .isString()
      .withMessage('parameter password must be string')
      .bail()
      .notEmpty()
      .withMessage('parameter password cannot empty')
      .bail()
      .isLength({min:8})
      .withMessage('minimum character in parameter password is 8'),
    body("role")
      .exists()
      .withMessage("parameter role is required")
      .bail()
      .isString()
      .withMessage('parameter role must be string')
      .bail()
      .notEmpty()
      .withMessage('parameter role cannot empty')
      .bail()
      .isIn(['ADMIN', 'USER'])
      .withMessage('parameter role not accepted: ["USER","ADMIN"]'),
    (req,res,next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const error = errors.array().map((el) => {
          return el.msg;
        });
        const resultError = error.toString();
        const output = new DefaultResponse(false, 400, resultError)
        return res.status(output.statusCode).json(output.getBadRequestResponse());
      }
      next();
    }
]

const validateLogin = [
  body("username")
      .exists()
      .withMessage("parameter username is required")
      .bail()
      .isString()
      .withMessage('parameter username must be string')
      .bail()
      .notEmpty()
      .withMessage('parameter username cannot empty')
      .bail()
      .isLength({min:5})
      .withMessage('minimum character in parameter username is 5'),
    body("password")
      .exists()
      .withMessage("parameter password is required")
      .bail()
      .isString()
      .withMessage('parameter password must be string')
      .bail()
      .notEmpty()
      .withMessage('parameter password cannot empty')
      .bail()
      .isLength({min:8})
      .withMessage('minimum character in parameter password is 8'),
    (req,res,next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const error = errors.array().map((el) => {
          return el.msg;
        });
        const resultError = error.toString();
        const output = new DefaultResponse(false, 400, resultError)
        return res.status(output.statusCode).json(output.getBadRequestResponse());
      }
      next();
    }
]

const validateUpdateUser = [
  body("name")
      .optional()
      .isString()
      .withMessage('parameter name must be string')
      .bail()
      .notEmpty()
      .withMessage('parameter name cannot empty'),
    body("username")
      .optional()
      .isString()
      .withMessage('parameter username must be string')
      .bail()
      .notEmpty()
      .withMessage('parameter username cannot empty')
      .bail()
      .isLength({min:5})
      .withMessage('minimum character in parameter username is 5'),
    body("password")
      .optional()
      .isString()
      .withMessage('parameter password must be string')
      .bail()
      .notEmpty()
      .withMessage('parameter password cannot empty')
      .bail()
      .isLength({min:8})
      .withMessage('minimum character in parameter password is 8'),
    (req,res,next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const error = errors.array().map((el) => {
          return el.msg;
        });
        const resultError = error.toString();
        const output = new DefaultResponse(false, 400, resultError)
        return res.status(output.statusCode).json(output.getBadRequestResponse());
      }
      next();
    }
]

module.exports = {validateUser, validateLogin, validateUpdateUser}