import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose'
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { ResponseTime, ResponseTimeSchema } from './response-time/schemas/response-time.schema';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { ResponseTimeInterceptor } from './common/interceptor/response-time.interceptor';
import { ErrorMessage, ErrorMessageSchema } from './error-message/schemas/error-message.schema';
import { ErrorFilter } from './common/interceptor/error.filter';
import { RequestMethod } from '@nestjs/common/enums/request-method.enum';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://0.0.0.0/store-project'),
    MongooseModule.forFeature([{ name: ResponseTime.name, schema: ResponseTimeSchema }]),
    MongooseModule.forFeature([{ name: ErrorMessage.name, schema: ErrorMessageSchema }]),
    AuthModule,
    UsersModule
  ],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseTimeInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: ErrorFilter,
    },
  ],
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer
    .apply(LoggerMiddleware)
    .forRoutes(
      { path: '*', method: RequestMethod.POST },
    );
  }
}
