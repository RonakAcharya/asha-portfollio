import { CommonModule } from '@angular/common';
import { Component, Renderer2 } from '@angular/core';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  isMenuOpen: boolean = false; // State for mobile menu visibility
  isDarkTheme: boolean = false; // State for current theme

  isDarkMode = false;
  activeSection: string = 'home';
  constructor(private _sharedService: SharedService) { }

  ngOnInit() {
    this.setSubjects();
  }

  setSubjects() {
    this._sharedService.darkThemeListener$.subscribe((isDark: boolean) => {
      this.isDarkMode = isDark;
    })
  }

  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    this._sharedService.setDarkTheme.next(this.isDarkMode);
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen; // Toggle menu state
  }

  closeMenu(): void {
    // Close menu, typically called when a nav link is clicked
    this.isMenuOpen = false;
  }
}
