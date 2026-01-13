import {Schema, model} from 'mongoose';

export interface Especes {
    name: string
}

const especesShema = new Schema<Especes>({
    name: { type: String, required: true}
})

export default model<Especes>('Especes', especesShema)