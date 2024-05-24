import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'

export type ErrorMessageDocument = HydratedDocument<ErrorMessage>

@Schema({timestamps: true})
export class ErrorMessage {
    @Prop({ required: true })
    method: string

    @Prop({ required: true })
    route: string

    @Prop({ required: true })
    error_message: string
}

export const ErrorMessageSchema = SchemaFactory.createForClass(ErrorMessage)