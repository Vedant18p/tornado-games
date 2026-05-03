import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Location } from '@angular/common';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-page-wrapper',
  imports: [CommonModule, MatIconModule],
  templateUrl: './page-wrapper.component.html',
  styleUrl: './page-wrapper.component.scss'
})
export class PageWrapperComponent {
  @Input() showBackButton = true;

  constructor(private location: Location) {}

  goBack() {
    this.location.back();
  }
}
