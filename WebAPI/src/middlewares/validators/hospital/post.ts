import { body } from "express-validator";

const validations = [
  body("name").exists().withMessage("Name is required."),
  body("name")
    .if(body("name").exists())
    .isLength({ min: 3 })
    .withMessage("Min length of name 3 characters."),
  body("location").exists().withMessage("Location is required."),
  body("location")
    .if(body("location").exists())
    .isLength({ min: 5 })
    .withMessage("Min length of location 5 characters."),
  body("type").exists().withMessage("Type is required."),
];

export default validations;
