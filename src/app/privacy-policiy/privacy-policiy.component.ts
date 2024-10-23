import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-privacy-policiy',
  standalone: true,
  imports: [],
  templateUrl: './privacy-policiy.component.html',
  styleUrl: './privacy-policiy.component.scss',
})
export class PrivacyPoliciyComponent {
  location = inject(Location);

  /**
   * @param router - Router service used for navigation within the application.
   */
  constructor(private router: Router) {}

  /**
   * ngOnInit lifecycle hook for Angular component.
   * Navigates to the '/privacy_policy' URL and scrolls the window to the top.
   */
  ngOnInit() {
    this.router.navigateByUrl('/privacy_policy').then(() => {
      window.scrollTo(0, 0);
    });
  }

  /**
   * Navigates back to the previous page in the browser history.
   */
  goBack() {
    this.location.back();
  }
}