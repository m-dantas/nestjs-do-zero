import { ExecutionContext, NestInterceptor, CallHandler, Injectable } from '@nestjs/common'
import { Observable, tap } from 'rxjs'

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
    const { method, url } = context.switchToHttp().getRequest()
    const now = Date.now()

    console.log(`[REQ] ${method} ${url} - start of request`)
    return next.handle().pipe(
      tap(() => {
        console.log(`[RES] ${method} ${url} - final of request - ${Date.now() - now}ms`)
      })
    )
  }
}
