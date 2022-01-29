import { Model, model, Schema } from "mongoose";

export interface Counters {
  id: string;
  seq: number;
  reference_value: null;
}

const schema: Schema = new Schema<Counters>({
  id: {
    type: String,
    unique: true,
  },
  seq: {
    type: Number,
    default: 0,
  },
  reference_value: {
    type: Number,
    default: null,
  },
});

const Counters: Model<Counters> = model("Counters", schema, "counters");
export default Counters;
