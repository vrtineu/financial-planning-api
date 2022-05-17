import { Model, model, Schema } from 'mongoose';

export interface ICounters {
  id: string;
  seq: number;
  reference_value: null;
}

const schema: Schema = new Schema<ICounters>({
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

export const Counters: Model<ICounters> = model('Counters', schema, 'counters');
