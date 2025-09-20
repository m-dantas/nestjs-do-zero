import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable } from "rxjs";

@Injectable()
export class BodyCreateTaskInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
    const { method, url, body } = context.switchToHttp().getRequest()

    console.log(`[REQ] ${method} ${url}`)
    console.log(`[BODY] ${JSON.stringify(body, null, 2)}`)

    return next.handle()
  }
}