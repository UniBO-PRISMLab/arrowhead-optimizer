import { HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

export abstract class HttpHandler {
  protected _url: string = '';


  protected handleError(error: Error | HttpErrorResponse): Observable<never> {
    let msg = '';
    //* This means sintax error (aka wrong url or didn't find the URL) (dont know the type)
    if (error.name == 'SyntaxError') {
      msg += `sintax error: bad URL`;
    } else if (error instanceof HttpErrorResponse)
      if (error.status === 0)
        msg += `Client-side error: ${JSON.stringify(error, ['message'])}`;
      else
        msg += `Error status code: ${error.status}, body: ${JSON.stringify(
          error.error
        )}`;
    return throwError(() => new Error(msg));
  }
}
