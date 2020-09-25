import {
  Component,
  OnInit,
  AfterViewInit,
  OnDestroy,
} from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit, AfterViewInit, OnDestroy {

  constructor(
    public authService: AuthService
  ) { }

  ngOnInit(): void {
    this.authService.userInformation$.subscribe(data => {
      this.authService.userData = data;
    });
  }

  ngAfterViewInit(): void {

  }

  ngOnDestroy(): void {

  }
}
