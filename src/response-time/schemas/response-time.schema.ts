import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'

export type ResponseTimeDocument = HydratedDocument<ResponseTime>

@Schema({timestamps: true})
export class ResponseTime {
    @Prop({ required: true })
    method: string

    @Prop({ required: true })
    route: string

    @Prop({ required: true })
    response_time: string
}

export const ResponseTimeSchema = SchemaFactory.createForClass(ResponseTime)