import { TestBed } from '@angular/core/testing';

import { NotificationVitaminedService } from './notification-vitamined.service';

describe('NotificationVitaminedService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NotificationVitaminedService = TestBed.get(NotificationVitaminedService);
    expect(service).toBeTruthy();
  });
});
