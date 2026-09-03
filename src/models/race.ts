import { Schema, model, Document } from 'mongoose';

export interface ISkill {
  name: string;
  isPrimary: boolean;
}

export interface IRace extends Document {
  name: string;
  isPureBreed: boolean;       // Pur-sang = compétences fixes, croisé = configurables
  skills: ISkill[];           // 3 compétences principales pour les pur-sang
  createdAt: Date;
  updatedAt: Date;
}

const SkillSchema = new Schema<ISkill>({
  name: { type: String, required: true, trim: true },
  isPrimary: { type: Boolean, default: false },
}, { _id: false });

const RaceSchema = new Schema<IRace>(
  {
    name: { type: String, required: true, unique: true, trim: true },
    isPureBreed: { type: Boolean, required: true, default: true },
    skills: {
      type: [SkillSchema],
      validate: {
        validator: (skills: ISkill[]) => {
          const primaryCount = skills.filter(s => s.isPrimary).length;
          return primaryCount <= 3;
        },
        message: 'Une race ne peut pas avoir plus de 3 compétences principales.',
      },
      default: [],
    },
  },
  { timestamps: true }
);

export default model<IRace>('Race', RaceSchema);