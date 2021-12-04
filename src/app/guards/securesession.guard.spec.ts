import { TestBed } from '@angular/core/testing';

import { SecuresessionGuard } from './securesession.guard';

describe('SecuresessionGuard', () => {
  let guard: SecuresessionGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(SecuresessionGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
