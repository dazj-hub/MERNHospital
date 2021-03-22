import { Request, Response, Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "config";
import { ErrorHandler, handleError } from "../error";
import User from "../models/user";
import body_auth_validations from "../middlewares/validators/auth/auth.validator";
import validator_handler from "../middlewares/validator";
import auth_token from '../middlewares/auth/auth.midd';

const router = Router();

// =============================
// @route      GET api/auth
// @desc       Get logged in user
// @access     Private
// =============================
router.get("/", auth_token, async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.user?.id).select("-password");
    res.json(user);
  } catch (err) {
    const custom = new ErrorHandler(500, "Server Error");
    handleError(custom, req, res);
  }
});

// ====================================
// @route      POST v1/auth
// @desc       Auth user and get token
// @access     Public
// =====================================
router.post("/", body_auth_validations, validator_handler,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (user) {
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          const custom = new ErrorHandler(400, "Invalid Credentials");
          handleError(custom, req, res);
        }
        const payload = {
          user: {
            id: user.id,
          },
        };
        jwt.sign(
          payload,
          config.get("jwt_secret"),
          { expiresIn: 3600 },
          (err, token) => {
            if (err) throw err;

            res.status(200).json({ token });
          }
        );
      } else {
        const custom = new ErrorHandler(400, "Invalid User");
        handleError(custom, req, res);
      }
    } catch {
      const custom = new ErrorHandler(500, "Server Error");
      handleError(custom, req, res);
    }
  }
);

export default router;
