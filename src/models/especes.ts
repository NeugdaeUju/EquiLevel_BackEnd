import {Schema, model, Types } from 'mongoose';

export interface Especes {
    name: string,
    userId: Types.ObjectId
}

const especesShema = new Schema<Especes>({
    name: { type: String, required: true},
    userId: {type: Schema.Types.ObjectId, ref: 'User', required: true}
})

export default model<Especes>('Especes', especesShema)