import { Schema, model, Document, Types } from "mongoose";
import { IHospitalSchema } from './hospital';

const DoctorSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  speciality: {
    type: String,
    required: true,
    default: "General Medicine",
  },
  myHospitals: { type: [Types.ObjectId] },
  date: {
    type: Date,
    default: Date.now(),
  },
});

interface IDoctorSchema extends Document {
  firstName: string;
  lastName: string;
  email: string;
  speciality: string;
  myHospitals: [IHospitalSchema['_id']];
  date: Date;
}

export default model<IDoctorSchema>("Doctor", DoctorSchema);
