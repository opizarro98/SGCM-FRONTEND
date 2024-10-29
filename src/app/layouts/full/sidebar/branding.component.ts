import { Component } from '@angular/core';

@Component({
  selector: 'app-branding',
  template: `
    <div class="branding">
      <a href="/">
        <img
          src="./assets/images/logos/logosf.png"
          class="align-middle m-2"
          alt="logo"
          width="160px"
          height="80px"
        />
      </a>
    </div>
  `,
})
export class BrandingComponent {
  constructor() { }
}
