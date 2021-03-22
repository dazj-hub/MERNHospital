import { Request, Response, Router } from "express";
import Hospital from "../models/hospital";
import Doctor from "../models/doctor";
import { ErrorHandler, handleError } from "../error";
import auth_token from "../middlewares/auth/auth.midd";
import post_validations from "../middlewares/validators/hospital/post";
import put_validations from "../middlewares/validators/hospital/put";
import validator_handler from "../middlewares/validator";

const router = Router();

router.get("/", auth_token, async (req: Request, res: Response) => {
  try {
    const hospitals = await Hospital.find().sort({ date: -1 });
    return res.status(200).json({
      data: hospitals,
      msj: "List of hospitals",
    });
  } catch (error) {
    const custom = new ErrorHandler(500, "Server Error");
    handleError(custom, req, res);
  }
});

router.get("/:id", auth_token, async (req: Request, res: Response) => {
  try {
    let hospital = await Hospital.findById(req.params.id);

    if (!hospital) {
      const custom = new ErrorHandler(404, "Hospital not Found");
      handleError(custom, req, res);
    }

    return res.status(200).json({
      data: hospital,
      msj: "Hospital funded",
    });
  } catch (error) {
    const custom = new ErrorHandler(500, "Server Error");
    handleError(custom, req, res);
  }
});

router.post("/", auth_token, post_validations, validator_handler, 
  async (req: Request, res: Response) => {
    const { name, location, type, webSite } = req.body;
    try {
      let newHospital = new Hospital({
        name,
        location,
        type,
        webSite,
        //user: req.user?.id,
      });
      const hospital = await newHospital.save();
      return res.status(201).json({
        data: hospital,
        msj: "Hospital created",
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
      const { name, location, type, webSite } = req.body;
      const hospitalFields: any = {};
      if (name) hospitalFields.name = name;
      if (location) hospitalFields.location = location;
      if (type) hospitalFields.type = type;
      if (webSite) hospitalFields.webSite = webSite;

      let hospital = await Hospital.findById(req.query.id);

      if (!hospital) {
        const custom = new ErrorHandler(404, "Hospital not Found");
        handleError(custom, req, res);
      }

      // if (hospital?.user.toString() !== req.user?.id) {
      //     const custom = new ErrorHandler(401, 'Not Authorized');
      //     handleError(custom, req, res);
      // }

      hospital = await Hospital.findByIdAndUpdate(
        req.query.id,
        { $set: hospitalFields },
        { new: true }
      );

      return res.status(200).json({
        data: hospital,
        msj: "Hospital updated",
      });
    } catch (error) {
      const custom = new ErrorHandler(500, "Server Error");
      handleError(custom, req, res);
    }
  }
);

router.delete("/:id", auth_token, async (req: Request, res: Response) => {
  try {
    let hospital = await Hospital.findById(req.params.id);

    if (!hospital) {
      const custom = new ErrorHandler(404, "Hospital not Found");
      return handleError(custom, req, res);
    }

    let doctors = await Doctor.find({ myHospitals: { "$in": [req.params.id]}});
    if (doctors.length > 0) {      
      const custom = new ErrorHandler(409, "Hospital Conflict: The hospital is assigned to one or more doctors.");
      return handleError(custom, req, res);
    }
    // if (hospital?.user.toString() !== req.user?.id) {
    //     const custom = new ErrorHandler(401, 'Not Authorized');
    //     handleError(custom, req, res);
    // }

    await Hospital.findByIdAndRemove(req.params.id);

    return res.status(200).json({
      data: hospital,
      msj: "Hospital Removed",
    });
  } catch (error) {
    const custom = new ErrorHandler(500, "Server Error");
    handleError(custom, req, res);
  }
});

export default router;
