const { body, query, param, validationResult } = require("express-validator");
const DefaultResponse = require("../../helpers/generate_response");

const validateCreateTransaction = [
  body('material_id')
    .exists()
    .withMessage("parameter material_id is required")
    .bail()
    .isNumeric()
    .withMessage('parameter material_id must be numeric')
    .bail()
    .notEmpty()
    .withMessage('parameter material_id cannot empty'),
  body('amount')
    .exists()
    .withMessage("parameter amount is required")
    .bail()
    .isNumeric()
    .withMessage('parameter amount must be numeric')
    .bail()
    .notEmpty()
    .withMessage('parameter amount cannot empty'),
  body('reff_id')
    .exists()
    .withMessage("parameter reff_id is required")
    .bail()
    .isString()
    .withMessage('parameter reff_id must be string')
    .bail()
    .notEmpty()
    .withMessage('parameter reff_id cannot empty')
    .bail()
    .isLength({min:5})
    .withMessage('minimum character in parameter material_name is 5'),
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

const validateFindOneTransaction = [
  query('transaction_id')
    .exists()
    .withMessage("parameter transaction_id is required")
    .bail()
    .isNumeric()
    .withMessage('parameter transaction_id must be numeric')
    .bail()
    .notEmpty()
    .withMessage('parameter transaction_id cannot empty'),
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

const validateFindAllTransaction = [
  query('vendor_name')
    .optional()
    .isString()
    .withMessage('parameter vendor_name must be string')
    .bail()
    .notEmpty()
    .withMessage('parameter vendor_name cannot empty'),
  query('customer_name')
    .optional()
    .isString()
    .withMessage('parameter customer_name must be string')
    .bail()
    .notEmpty()
    .withMessage('parameter customer_name cannot empty'),
  query('material_name')
    .optional()
    .isString()
    .withMessage('parameter material_name must be string')
    .bail()
    .notEmpty()
    .withMessage('parameter material_name cannot empty'),
  query('reff_id')
    .optional()
    .isString()
    .withMessage('parameter reff_id must be string')
    .bail()
    .notEmpty()
    .withMessage('parameter reff_id cannot empty'),
  query('status')
    .optional()
    .isString()
    .withMessage('parameter status must be string')
    .bail()
    .notEmpty()
    .withMessage('parameter status cannot empty')
    .bail()
    .isIn(['PENDING', 'SUCCESS', 'FAILED'])
    .withMessage('parameter status not accepted: ["PENDING","SUCCESS","FAILED"]'),
  query('transaction_id')
    .optional()
    .isNumeric()
    .withMessage('parameter transaction_id must be numeric')
    .bail()
    .notEmpty()
    .withMessage('parameter transaction_id cannot empty'),
  query('page')
    .exists()
    .withMessage("parameter page is required")
    .bail()
    .isNumeric()
    .withMessage('parameter page must be numeric')
    .bail()
    .notEmpty()
    .withMessage('parameter page cannot empty'),
  query('size')
    .exists()
    .withMessage("parameter size is required")
    .bail()
    .isNumeric()
    .withMessage('parameter size must be numeric')
    .bail()
    .notEmpty()
    .withMessage('parameter size cannot empty'),
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

const validateUpdateStatusTransaction = [
  body('transaction_id')
    .exists()
    .withMessage("parameter transaction_id is required")
    .bail()
    .isNumeric()
    .withMessage('parameter transaction_id must be numeric')
    .bail()
    .notEmpty()
    .withMessage('parameter transaction_id cannot empty'),
  body("status")
    .exists()
    .withMessage("parameter transaction_id is required")
    .bail()
    .isString()
    .withMessage('parameter status must be string')
    .bail()
    .notEmpty()
    .withMessage('parameter status cannot empty')
    .bail()
    .isIn(['SUCCESS', 'FAILED'])
    .withMessage('parameter status not accepted: ["SUCCESS","FAILED"]'),
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

const validateDeleteTransaction = [
  param('transaction_id')
    .exists()
    .withMessage("parameter transaction_id is required")
    .bail()
    .isNumeric()
    .withMessage('parameter transaction_id must be numeric')
    .bail()
    .notEmpty()
    .withMessage('parameter transaction_id cannot empty'),
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

module.exports = {
  validateCreateTransaction,
  validateFindOneTransaction,
  validateFindAllTransaction,
  validateUpdateStatusTransaction,
  validateDeleteTransaction
}