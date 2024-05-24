import { HttpException, Catch, ExceptionFilter, ArgumentsHost } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ErrorMessage } from 'src/error-message/schemas/error-message.schema';

@Catch(HttpException)
export class ErrorFilter implements ExceptionFilter  {
  constructor(@InjectModel(ErrorMessage.name) private errorMessageModel: Model<ErrorMessage>) {}
  
  catch(exception: HttpException, host: ArgumentsHost) {
    const httpRequest = host.switchToHttp();


    this.errorMessageModel.create({
        method: httpRequest.getRequest().method,
        route: httpRequest.getRequest().url,
        error_message: `${exception}`
      })
  }
}