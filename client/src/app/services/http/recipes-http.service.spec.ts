import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { RecipesHttpService } from './recipes-http.service';

describe('RecipesService', () => {
  let service: RecipesHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, HttpClientModule],
    });
    service = TestBed.inject(RecipesHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
