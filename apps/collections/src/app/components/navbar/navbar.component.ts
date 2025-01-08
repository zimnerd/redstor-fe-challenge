import { Component } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSelectModule, MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, MatToolbarModule, MatSelectModule, TranslateModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  selectedLanguage = 'en';

  constructor(private translate: TranslateService) {
    this.translate.use(this.selectedLanguage);
  }

  onLanguageChange(event: MatSelectChange) {
    const selectedLanguage = event.value;
    this.translate.use(selectedLanguage);
  }
}
