const { body, validationResult, query, param } = require("express-validator");
const DefaultResponse = require("../../helpers/generate_response");

const validateCreateMaterial = [
  body('material_name')
    .exists()
    .withMessage("parameter material_name is required")
    .bail()
    .isString()
    .withMessage('parameter material_name must be string')
    .bail()
    .notEmpty()
    .withMessage('parameter material_name cannot empty')
    .bail()
    .isLength({min:3})
    .withMessage('minimum character in parameter material_name is 3'),
  body('vendor_id')
    .exists()
    .withMessage("parameter vendor_id is required")
    .bail()
    .isNumeric()
    .withMessage('parameter vendor_id must be numeric')
    .bail()
    .notEmpty()
    .withMessage('parameter vendor_id cannot empty'),
  body('stock')
    .exists()
    .withMessage("parameter stock is required")
    .bail()
    .isNumeric()
    .withMessage('parameter stock must be numeric')
    .bail()
    .notEmpty()
    .withMessage('parameter stock cannot empty')
    .bail()
    .isFloat({min:1})
    .withMessage('minimum value 1 in parameter stock'),
  body("status")
    .exists()
    .withMessage("parameter status is required")
    .bail()
    .isString()
    .withMessage('parameter status must be string')
    .bail()
    .notEmpty()
    .withMessage('parameter status cannot empty')
    .bail()
    .isIn(['AVAILABLE', 'EMPTY'])
    .withMessage('parameter status not accepted: ["AVAILABLE","EMPTY"]'),
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

const validateFindOneAndDeleteMaterial = [
  query("material_id")
    .exists()
    .withMessage("parameter material_id is required")
    .bail()
    .isNumeric("parameter material_id is numeric")
    .withMessage(),
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

const validateFindAllMaterial = [
  query('material_name')
    .optional()
    .isString()
    .withMessage('parameter material_name must be string')
    .bail()
    .notEmpty()
    .withMessage('parameter material_name cannot empty')
    .bail()
    .isLength({min:3})
    .withMessage('minimum character in parameter material_name is 3'),
  query('vendor_id')
    .optional()
    .isNumeric()
    .withMessage('parameter vendor_id must be numeric')
    .bail()
    .notEmpty()
    .withMessage('parameter vendor_id cannot empty'),
  query("status")
    .optional()
    .isString()
    .withMessage('parameter status must be string')
    .bail()
    .notEmpty()
    .withMessage('parameter status cannot empty')
    .bail()
    .isIn(['AVAILABLE', 'EMPTY'])
    .withMessage('parameter status not accepted: ["AVAILABLE","EMPTY"]'),
  query("page")
    .exists()
    .withMessage("parameter page is required")
    .bail()
    .isNumeric()
    .withMessage("parameter page is numeric"),
  query("size")
    .exists()
    .withMessage("parameter page is required")
    .bail()
    .isNumeric()
    .withMessage("parameter page is numeric"),
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

const validateUpdateMaterial = [
  body('material_name')
    .optional()
    .isString()
    .withMessage('parameter material_name must be string')
    .bail()
    .notEmpty()
    .withMessage('parameter material_name cannot empty')
    .bail()
    .isLength({min:3})
    .withMessage('minimum character in parameter material_name is 3'),
  body('vendor_id')
    .optional()
    .isNumeric()
    .withMessage('parameter vendor_id must be numeric')
    .bail()
    .notEmpty()
    .withMessage('parameter vendor_id cannot empty'),
  body('stock')
    .optional()
    .isNumeric()
    .withMessage('parameter stock must be numeric')
    .bail()
    .notEmpty()
    .withMessage('parameter stock cannot empty')
    .bail()
    .isFloat({min:1})
    .withMessage('minimum value 1 in parameter stock'),
  body("status")
    .optional()
    .isString()
    .withMessage('parameter status must be string')
    .bail()
    .notEmpty()
    .withMessage('parameter status cannot empty')
    .bail()
    .isIn(['AVAILABLE', 'EMPTY'])
    .withMessage('parameter status not accepted: ["AVAILABLE","EMPTY"]'),
  param("material_id")
    .exists()
    .withMessage("parameter material_id must be numeric")
    .bail()
    .isNumeric()
    .withMessage('parameter material_id must be numeric')
    .bail()
    .notEmpty()
    .withMessage('parameter material_id cannot empty'),
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
  validateCreateMaterial, 
  validateFindOneAndDeleteMaterial, 
  validateFindAllMaterial,
  validateUpdateMaterial
}