import { TestBed } from '@angular/core/testing';

import { HttpErrorInterceptorService } from './http-interceptor.service';

describe('AppErrorHandlerService', () => {
  let service: HttpErrorInterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpErrorInterceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
