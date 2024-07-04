const { query, validationResult, body } = require("express-validator");
const DefaultResponse = require("../../helpers/generate_response");

const validateQueryFindAll = [
  query("name")
    .optional()
    .isString()
    .withMessage('parameter name must string')
    .bail()
    .notEmpty()
    .withMessage('parameter name cannot empty'),
  query("address")
    .optional()
    .isString()
    .withMessage('parameter address must string')
    .bail()
    .notEmpty()
    .withMessage('parameter address cannot empty'),
  query("page")
    .exists()
    .withMessage('page is required')
    .bail()
    .isNumeric()
    .withMessage('parameter page must numeric'),
  query("size")
    .exists()
    .withMessage('size is required')
    .bail()
    .isNumeric()
    .withMessage('parameter size must numeric'),
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

const validateVendorRequestAndUpdate = [
  body("name")
    .exists()
    .withMessage('parameter name is required')
    .bail()
    .isString()
    .withMessage('parameter name must string')
    .bail()
    .notEmpty()
    .withMessage('parameter name cannot empty'),
  body("address")
    .exists()
    .withMessage('parameter address is required')
    .bail()
    .isString()
    .withMessage('parameter address must string')
    .bail()
    .notEmpty()
    .withMessage('parameter address cannot empty'),
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

const validateQueryFindOneAndDelete = [
  query("vendor_id")
    .exists()
    .withMessage('parameter vendor_id is required')
    .bail()
    .isNumeric()
    .withMessage('parameter vendor_id must numeric')
    .bail()
    .notEmpty()
    .withMessage('parameter vendor_id cannot empty'),
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

module.exports = { validateQueryFindAll, validateVendorRequestAndUpdate, validateQueryFindOneAndDelete }