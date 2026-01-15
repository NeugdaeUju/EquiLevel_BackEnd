import {Schema, model, Types } from 'mongoose';

export interface Races {
    name: string,
    userId: Types.ObjectId,
    especeId: Types.ObjectId
}

const racesShema = new Schema<Races>({
    name: { type: String, required: true},
    userId: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    especeId: {type: Schema.Types.ObjectId, ref: 'Especes,', required: true}
})

export default model<Races>('Races', racesShema)