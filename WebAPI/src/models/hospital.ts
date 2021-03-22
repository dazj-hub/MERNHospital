import { Schema, model, Document } from "mongoose";

const HospitalSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
    default: "Public",
  },
  webSite: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

export interface IHospitalSchema extends Document {
  name: string;
  location: string;
  type: string;
  webSite: string;
  date: Date;
}

export default model<IHospitalSchema>("Hospital", HospitalSchema);
