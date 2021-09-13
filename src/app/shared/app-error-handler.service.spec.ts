import { TestBed } from '@angular/core/testing';

import { HttpErrorInterceptorService } from './app-error-handler.service';

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
