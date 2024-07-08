import { Date, Number, Schema, Types, model } from "mongoose";


interface IStyle {
    name: string;
}

const styleSchema = new Schema<IStyle>({
    name: { type: String, required: true, trim: true }
})

const Style = model<IStyle>('styles', styleSchema);

export { IStyle, styleSchema }