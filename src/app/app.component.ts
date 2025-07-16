import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, ElementRef, HostListener, inject, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Meta, Title } from '@angular/platform-browser';
import AOS from 'aos';
import { HeaderComponent } from './component/header/header.component';
import { SharedService } from './services/shared.service';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { OurServicesComponent } from './our-services/our-services.component';
import { TeamComponent } from './team/team.component';
import { OurProductsComponent } from './our-products/our-products.component';
import { OurTechnologyComponent } from './our-technology/our-technology.component';
import { OurMajorWorkComponent } from './our-major-work/our-major-work.component';
import { OurImpactsComponent } from './our-impacts/our-impacts.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
declare var bootstrap: any;
declare let L: any;

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    ReactiveFormsModule, 
    HeaderComponent, 
    HomeComponent, 
    AboutComponent, 
    OurServicesComponent, 
    TeamComponent, 
    OurProductsComponent, 
    OurTechnologyComponent, 
    OurMajorWorkComponent, 
    OurImpactsComponent,
    ContactUsComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  protected scriptURL = 'https://script.google.com/macros/s/AKfycbx5Ozg3jfnZOIX6xypBdQiSDDhpcf5uf57O77Tp3roU6hKNOIFWXi3zbs0OVWowCfqU/exec'
  protected _http = inject(HttpClient);
  protected _fb = inject(FormBuilder);
  @ViewChild('contactFormElement') contactFormElement!: ElementRef<HTMLFormElement>;

  contactForm: FormGroup;
  email = 'sales@thirdeyeservice.com';

  selectedAboutOption: string = '';
  currentIndex = 0;
  isDarkMode = false;
  map: any;

  activeSection: string = 'home';

  bgImageMap: { [key: string]: string } = {
    'about': 'about.jpg',
    'team': 'team.jpg',
    'culture': 'culture.jpg',
    'ceo-message': 'ceo-msg.jpg'
  };

  teamMembers = [
    {
      name: 'Rahul Sharma',
      position: 'Founder & CEO',
      image: 'team1.jpg',
      linkedin: 'https://linkedin.com/in/rahul',
      twitter: ''
    },
    {
      name: 'Priya Mehta',
      position: 'CTO & Architect',
      image: 'team2.jpg',
      linkedin: '',
      twitter: 'https://twitter.com/priyamehta'
    },
    {
      name: 'Amit Patel',
      position: 'Marketing Lead',
      image: 'team3.jpg',
      linkedin: 'https://linkedin.com/in/amit',
      twitter: ''
    }
  ];
  culturePoints = [
    {
      icon: 'fas fa-check-circle',
      title: 'Systematic Monitoring',
      description: 'We ensure each process is carefully tracked and optimized.'
    },
    {
      icon: 'fas fa-user-shield',
      title: 'Data Security',
      description: 'Session monitoring & candidate security is our top priority.'
    },
    {
      icon: 'fas fa-clipboard-check',
      title: 'On-Time Delivery',
      description: 'We follow deadlines strictly and prioritize quality results.'
    },
    {
      icon: 'fas fa-lightbulb',
      title: 'Digital Innovation',
      description: 'We embrace automation & tech for smarter operations.'
    },
    {
      icon: 'fas fa-users',
      title: 'People First',
      description: 'We foster a supportive, growth-focused work environment.'
    },
    {
      icon: 'fas fa-globe',
      title: 'Global Spirit',
      description: 'Our reach spans across India, Congo, and beyond.'
    }
  ];


  constructor(private title: Title, private meta: Meta, private _sharedService: SharedService) {
    this.contactForm = this._fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      message: ['', Validators.required]
    });

    this.title.setTitle('3rd Eye Services | Empowering Growth with Technology');
    this.meta.addTags([
      { name: 'description', content: 'We provide software development, assessment platforms, digital marketing & more.' },
      { name: 'keywords', content: 'Angular, React, Node, Web Development, Digital Marketing, Assessment' }
    ]);
  }

  ngOnInit(): void {
    this.setSubjects();
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

  get selectedBgImage(): string {
    return this.bgImageMap[this.selectedAboutOption] || 'bg2.jpg';
  }

  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
  }

  setSubjects() {
    this._sharedService.darkThemeListener$.subscribe((isDark: boolean) => {
      this.isDarkMode = isDark;
      document.body.classList.toggle('dark-theme', isDark);
    });
  }

  // Scroll spy to highlight active menu
  @HostListener('window:scroll', [])
  onWindowScroll() {
    const NAVBAR_HEIGHT = 80; // Adjust this to match your fixed header height

    const sections = [
      'home', 'about', 'team', 'culture', 'ceo-message',
      'services', 'products', 'technologies',
      'projects', 'map', 'contact'
    ];

    const scrollPosition = window.scrollY + NAVBAR_HEIGHT + 1; // Add 1 to avoid exact overlap issues

    let currentSection = 'home';

    for (const id of sections) {
      const el = document.getElementById(id);
      if (el) {
        const sectionTop = el.offsetTop;
        const sectionHeight = el.offsetHeight;

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          currentSection = id;
          break;
        }
      }
    }

    // Group all sub-sections under 'about'
    if (['about', 'team', 'culture', 'ceo-message'].includes(currentSection)) {
      this.activeSection = 'about';
    } else {
      this.activeSection = currentSection;
    }
  }


  closeNavbar(sectionId?: string) {
    if (sectionId) {
      this.selectedAboutOption = sectionId;
      this.activeSection = sectionId;

      // Wait for DOM to render the section before scrolling
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 200); // Delay allows ngIf to render the section
    }

    const navbar = document.querySelector('.navbar-collapse');
    if (navbar && navbar.classList.contains('show')) {
      navbar.classList.remove('show');
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
      this.contactFormElement.nativeElement.submit();
      alert('Message sent successfully!');
      this.contactForm.reset();
    } else {
      alert('Please fill all required fields correctly.');
    }
    // if (this.contactForm.valid) {
    //   const formData = this.contactForm.value;

    //   // Use 'text/plain' to avoid preflight request
    //   this._http.post(
    //     this.scriptURL,
    //     JSON.stringify(formData), // send JSON manually
    //     {
    //       headers: new HttpHeaders({
    //         'Content-Type': 'text/plain' // triggers no preflight
    //       }),
    //       responseType: 'text'
    //     }
    //   ).subscribe({
    //     next: (res: any) => {
    //       alert('Message sent successfully!');
    //       this.contactForm.reset();
    //     },
    //     error: (err: any) => {
    //       console.error('Error:', err);
    //       alert('Error sending message. Please try again.');
    //     }
    //   });
    // }
  }

  isAboutChildActive(): boolean {
    return ['about', 'team', 'culture', 'ceo-message'].includes(this.activeSection);
  }

}
