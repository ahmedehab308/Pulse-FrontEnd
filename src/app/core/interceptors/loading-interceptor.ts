import { HttpInterceptorFn } from '@angular/common/http';
import { delay, finalize } from 'rxjs';
import { BusyService } from '../services/busy.service';
import { inject } from '@angular/core';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {

  const busySer:BusyService=inject(BusyService);
  busySer.busy();

  return next(req).pipe(
    delay(500),
    finalize(()=>busySer.idle())

  )
};
