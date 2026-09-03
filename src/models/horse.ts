import { Schema, model, Document, Types } from 'mongoose';

export type HorseSex = 'Mâle' | 'Femelle' | 'Hongre';
export type HorseStep = 'Naissance' | 'Croissance' | 'Entraînement' | 'Compétition' | 'BLUP 100';

export interface IHorse extends Document {
  name: string;
  sex: HorseSex;
  race: Types.ObjectId;         // Référence vers la collection Race
  step: HorseStep;
  blup: number;
  owner: Types.ObjectId;        // Référence vers la collection User
  createdAt: Date;
  updatedAt: Date;
}

const HorseSchema = new Schema<IHorse>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    sex: {
      type: String,
      enum: ['Mâle', 'Femelle', 'Hongre'] satisfies HorseSex[],
      required: true,
    },
    race: {
      type: Schema.Types.ObjectId,
      ref: 'Race',
      required: true,
    },
    step: {
      type: String,
      enum: ['Naissance', 'Croissance', 'Entraînement', 'Compétition', 'BLUP 100'] satisfies HorseStep[],
      required: true,
      default: 'Naissance',
    },
    blup: {
      type: Number,
      min: -100,
      max: 100,
      default: -100,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

export default model<IHorse>('Horse', HorseSchema);