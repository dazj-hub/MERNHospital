import { query } from "express-validator";

const validations = [query("id").exists().withMessage(`Missing field '1'`)];

export default validations;
