import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, HostListener, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import AOS from 'aos';
declare var bootstrap: any;
declare let L: any;

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  private scriptURL = 'https://script.google.com/macros/s/AKfycbx5Ozg3jfnZOIX6xypBdQiSDDhpcf5uf57O77Tp3roU6hKNOIFWXi3zbs0OVWowCfqU/exec'
  protected _http = inject(HttpClient);
  protected _fb = inject(FormBuilder);

  contactForm: FormGroup;
  email = 'info@3rdeyeservice.com / thirdeyeservices22@yahoo.com';

  currentIndex = 0;
  isDarkMode = false;
  map: any;

  activeSection: string = 'about';

  constructor() {
    this.contactForm = this._fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      message: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    AOS.init({ duration: 1000 });
  }

  ngAfterViewInit() {
    this.initMap();
    this.initCounterObserver();
    // Handle window resize
    window.addEventListener('resize', () => {
      setTimeout(() => {
        this.map.invalidateSize();
      }, 300);
    });
  }

  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
  }

  // Scroll spy to highlight active menu
  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.initCounterObserver();
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

  initMap() {
    this.map = L.map('mapid').setView([22.2587, 71.1924], 5);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      attribution: '© OpenStreetMap'
    }).addTo(this.map);

    const customIcon = L.divIcon({
      className: 'custom-div-icon',
      html: `<div style="background-color:#b48e00;width:20px;height:20px;border-radius:50%;border:2px solid white;"></div>`,
      iconSize: [30, 42],
      iconAnchor: [15, 42]
    });

    const locations = [
      { lat: 22.2587, lng: 71.1924, name: 'Gujarat' },
      { lat: 27.0238, lng: 74.2179, name: 'Rajasthan' },
      { lat: 15.3173, lng: 75.7139, name: 'Karnataka' },
      { lat: 22.9734, lng: 78.6569, name: 'Madhya Pradesh' },
      { lat: 19.7515, lng: 75.7139, name: 'Maharashtra' },
      { lat: 18.1124, lng: 79.0193, name: 'Telangana' }
    ];

    locations.forEach(location => {
      L.marker([location.lat, location.lng], { icon: customIcon })
        .addTo(this.map)
        .bindPopup(location.name);
    });

    // Force the map to redraw correctly
    setTimeout(() => {
      this.map.invalidateSize();
    }, 500);
  }

  /** @note init counter */
  initCounterObserver() {
    const counters = document.querySelectorAll<HTMLElement>('.counter');

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        const counter = entry.target as HTMLElement;

        if (entry.isIntersecting && !counter.classList.contains('counted')) {
          const targetStr = counter.getAttribute('data-target');
          if (!targetStr) return;

          const target = parseInt(targetStr, 10);
          if (isNaN(target)) return;

          counter.classList.add('counted'); // prevent double counting

          const updateCount = () => {
            const current = parseInt(counter.innerText, 10) || 0;
            const increment = Math.ceil(target / 200);

            if (current < target) {
              counter.innerText = (current + increment).toString();
              setTimeout(updateCount, 15);
            } else {
              counter.innerText = target.toString();
              obs.unobserve(counter); // optional: stop observing
            }
          };

          updateCount();
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));
  }

  /** @note submit form */
  submitForm() {
    if (this.contactForm.valid) {
      const formData = this.contactForm.value;

      this._http.post(
        this.scriptURL,
        formData,
        {
          headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
          responseType: 'text' // Google Apps Script returns plain text
        }
      ).subscribe({
        next: (res: any) => {
          alert('Message sent successfully!');
          this.contactForm.reset();
        },
        error: (err: any) => {
          console.error('Error:', err);
          alert('Error sending message. Please try again.');
        }
      });
    }
  }

}
