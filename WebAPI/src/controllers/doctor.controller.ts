import { Request, Response, Router } from "express";
import Doctor from "../models/doctor";
import { ErrorHandler, handleError } from "../error";
import auth_token from "../middlewares/auth/auth.midd";
import post_validations from "../middlewares/validators/doctor/post";
import put_validations from "../middlewares/validators/doctor/put";
import validator_handler from "../middlewares/validator";

const router = Router();

router.get("/", auth_token, async (req: Request, res: Response) => {
  try {
    const doctors = await Doctor.find().sort({ date: -1 });
    return res.status(200).json({
      data: doctors,
      msj: "List of doctors",
    });
  } catch (error) {
    const custom = new ErrorHandler(500, "Server Error");
    handleError(custom, req, res);
  }
});

router.post("/", auth_token, post_validations, validator_handler,
  async (req: Request, res: Response) => {
    const { firstName, lastName, email, speciality, myHospitals } = req.body;
    try {
      let newDoctor = new Doctor({
        firstName,
        lastName,
        email,
        speciality,
        myHospitals,
        //user: req.user?.id,
      });
      const doctor = await newDoctor.save();
      return res.status(201).json({
        data: doctor,
        msj: "Doctor created",
      });
    } catch (err) {
      const custom = new ErrorHandler(500, "Server Error");
      handleError(custom, req, res);
    }
  }
);

router.put("/", auth_token, put_validations, validator_handler,
  async (req: Request, res: Response) => {
    try {
      const { firstName, lastName, email, speciality, myHospitals } = req.body;
      const doctorFields: any = {};
      if (firstName) doctorFields.firstName = firstName;
      if (lastName) doctorFields.lastName = lastName;
      if (email) doctorFields.email = email;
      if (speciality) doctorFields.speciality = speciality;
      if (myHospitals) doctorFields.myHospitals = myHospitals;

      let doctor = await Doctor.findById(req.query.id);

      if (!doctor) {
        const custom = new ErrorHandler(404, "Doctor not Found");
        handleError(custom, req, res);
      }

      // if (doctor?.user.toString() !== req.user?.id) {
      //     const custom = new ErrorHandler(401, 'Not Authorized');
      //     handleError(custom, req, res);
      // }

      doctor = await Doctor.findByIdAndUpdate(
        req.query.id,
        { $set: doctorFields },
        { new: true }
      );

      return res.status(200).json({
        data: doctor,
        msj: "Doctor updated",
      });
    } catch (error) {
      const custom = new ErrorHandler(500, "Server Error");
      handleError(custom, req, res);
    }
  }
);

router.delete("/:id", auth_token, async (req: Request, res: Response) => {
  try {
    let doctor = await Doctor.findById(req.params.id);

    if (!doctor) {
      const custom = new ErrorHandler(404, "Doctor not Found");
      handleError(custom, req, res);
    }

    // if (doctor?.user.toString() !== req.user?.id) {
    //     const custom = new ErrorHandler(401, 'Not Authorized');
    //     handleError(custom, req, res);
    // }

    await Doctor.findByIdAndRemove(req.params.id);

    return res.status(200).json({
      data: doctor,
      msj: "Doctor Removed",
    });
  } catch (error) {
    const custom = new ErrorHandler(500, "Server Error");
    handleError(custom, req, res);
  }
});

export default router;
