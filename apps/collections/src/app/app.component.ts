import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StateModule } from 'state-management';

@Component({
  standalone: true,
  imports: [RouterModule, StateModule],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'collections';
}
