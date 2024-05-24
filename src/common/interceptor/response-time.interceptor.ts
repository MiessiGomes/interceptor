import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ResponseTime } from 'src/response-time/schemas/response-time.schema';

@Injectable()
export class ResponseTimeInterceptor implements NestInterceptor {
  constructor(@InjectModel(ResponseTime.name) private responseTimeModel: Model<ResponseTime>) {}
  
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = Date.now();
    const httpRequest = context.switchToHttp().getRequest();
    return next
      .handle()
      .pipe(
        tap(() => {
          console.log()
          this.responseTimeModel.create({
            method: httpRequest.method,
            route: httpRequest.url,
            response_time: `${Date.now() - now}ms`
          })
        }),
      );
  }
}