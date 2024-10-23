import { Component, inject } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-imprint',
  standalone: true,
  imports: [],
  templateUrl: './imprint.component.html',
  styleUrl: './imprint.component.scss',
})
export class ImprintComponent {
  location = inject(Location);

  /**
   * @param router - Router service used for navigation within the application.
   */
  constructor(private router: Router) {}

  /**
   * ngOnInit lifecycle hook for Angular component.
   * Navigates to the '/imprint' URL and scrolls the window to the top.
   */
  ngOnInit() {
    this.router.navigateByUrl('/imprint').then(() => {
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