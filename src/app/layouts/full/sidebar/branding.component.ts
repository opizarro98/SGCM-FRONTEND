import { Component } from '@angular/core';

@Component({
  selector: 'app-branding',
  template: `
    <div class="branding">
      <a href="/">
        <img
          src="./assets/images/logos/logosf2.png"
          class="align-middle m-2"
          alt="logo"
          width="190px"
          height="100px"
        />
      </a>
    </div>
  `,
})
export class BrandingComponent {
  constructor() { }
}
