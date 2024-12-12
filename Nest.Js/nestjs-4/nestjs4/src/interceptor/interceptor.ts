import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { map, Observable, tap } from "rxjs";


export class LogInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {

        const req = context.switchToHttp().getRequest();
        const method = req.method;
        const url = req.url;
        const reqtime = Date.now()
        console.log(`Handling ${method} request to ${url}`);

        return next.handle().pipe(
            map((d) => {
                let rsp = {
                    data: d,
                    success: true
                }
                return rsp;
            })
            // tap((data) => {
            //     console.log(`Completed in ${Date.now() - reqtime} ms with response data as : ${data}`);
            // })
        )
    }
}