import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { cartEmptyGuard } from './cart-empty-guard';

describe('cartEmptyGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => cartEmptyGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
