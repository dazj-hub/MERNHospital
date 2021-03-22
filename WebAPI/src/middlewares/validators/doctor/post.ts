import { body } from "express-validator";

const validations = [
  body("firstName").exists().withMessage("First name is required."),
  body("firstName")
    .if(body("firstName").exists())
    .isLength({ min: 3 })
    .withMessage("Min length of first name 3 characters."),
  body("lastName").exists().withMessage("Last name is required."),
  body("lastName")
    .if(body("lastName").exists())
    .isLength({ min: 3 })
    .withMessage("Min length of last name 3 characters."),
  body("email").exists().withMessage("Email is required."),
  body("email")
    .if(body("email").exists())
    .isEmail()
    .withMessage("Invalid Email Format."),
  body("speciality").exists().withMessage("Speciality is required."),
  body("speciality")
    .if(body("speciality").exists())
    .isLength({ min: 3 })
    .withMessage("Min length of speciality 3 characters."),
];

export default validations;
