import { HttpClientModule } from '@angular/common/http';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';

import { RecipesStateService } from './recipes-state.service';

describe('RecipesStateService', () => {
  let service: RecipesStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    });
    service = TestBed.inject(RecipesStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('arrPos should equal one', fakeAsync(() => {
    service.arrPos++;
    expect(service['arrPos']).toBe(1);
  }));
});
