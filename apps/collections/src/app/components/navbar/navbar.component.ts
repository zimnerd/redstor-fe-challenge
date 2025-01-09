import { Component, Input, Signal, signal } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSelectModule, MatSelectChange } from '@angular/material/select';
import { RouterModule } from '@angular/router';

interface Breadcrumb {
  label: string;
  url?: string;
}

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, MatToolbarModule, MatSelectModule, TranslateModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  @Input() breadcrumbs: Breadcrumb[] = [];
  selectedLanguage = signal(localStorage.getItem('selectedLanguage') || 'en');

  constructor(private translate: TranslateService) {
    this.translate.use(this.selectedLanguage());
  }

  onLanguageChange(event: MatSelectChange) {
    this.selectedLanguage.set(event.value);
    this.translate.use(this.selectedLanguage());
    localStorage.setItem('selectedLanguage', this.selectedLanguage());
  }
}
