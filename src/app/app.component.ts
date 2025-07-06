import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import AOS from 'aos';
declare var bootstrap: any;

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  email = 'info@3rdeyeservice.com / thirdeyeservices22@yahoo.com';

  typingText = '';
  fullText = 'I Am Asha - Service Beyond Your Imagination';
  currentIndex = 0;
  isDarkMode = false;

  activeSection: string = 'about';

  ngOnInit(): void {
    this.startTypingEffect();
    AOS.init({ duration: 1000 });
  }

  startTypingEffect() {
    if (this.currentIndex < this.fullText.length) {
      this.typingText += this.fullText.charAt(this.currentIndex);
      this.currentIndex++;
      setTimeout(() => this.startTypingEffect(), 100);
    }
  }

  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
  }

  // Scroll spy to highlight active menu
  @HostListener('window:scroll', [])
  onWindowScroll() {
    const sections = ['about', 'services', 'projects', 'contact'];
    for (let section of sections) {
      const element = document.getElementById(section);
      if (element && window.scrollY >= element.offsetTop - 100) {
        this.activeSection = section;
      }
    }
  }

  closeNavbar() {
    const navbar = document.getElementById('navbarNav');
    if (navbar && navbar.classList.contains('show')) {
      const bsCollapse = new bootstrap.Collapse(navbar);
      bsCollapse.hide();
    }
  }
  
}
