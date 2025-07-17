import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ChangeDetectorRef, Component, ElementRef, HostListener, inject, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Meta, Title } from '@angular/platform-browser';
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

  typedTexts = [
    'Empowering Growth with Technology',
    'Unlocking Digital Success',
    'Meet the Experts Behind Innovation',
    'Building Ideas That Matter',
    'A Culture of Creativity and Impact',
    'Hear from Our Visionary CEO'
  ];
  currentText = '';
  private textIndex = 0;
  private charIndex = 0;

  activeSection: string = 'home';

  bgImageMap: { [key: string]: string } = {
    'about': 'about.jpg',
    'team': 'team.jpg',
    'culture': 'culture.jpg',
    'ceo-message': 'ceo-msg.jpg'
  };

  backgroundImages = ['bg1.jpg', 'bg2.jpg', 'team.jpg', 'about.jpg', 'culture.jpg', 'ceo-msg.jpg'];
  selectedHomeBgImage = this.backgroundImages[0];
  intervalId: any;

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


  constructor(private title: Title, private meta: Meta,private cdr: ChangeDetectorRef) {
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

    this.startAutoSlide();
    setTimeout(() => {
      this.typeText(); // delay to avoid expression change error
    }, 0);
  }

  get selectedBgImage(): string {
    return this.selectedHomeBgImage;
  }

  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
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
  }

  isAboutChildActive(): boolean {
    return ['about', 'team', 'culture', 'ceo-message'].includes(this.activeSection);
  }

  startAutoSlide() {
    this.intervalId = setInterval(() => {
      this.nextImage();
    }, 6000);
  }

  nextImage() {
    this.currentIndex = (this.currentIndex + 1) % this.backgroundImages.length;
    this.selectedHomeBgImage = this.backgroundImages[this.currentIndex];
  }

  selectImage(index: number) {
    this.currentIndex = index;
    this.selectedHomeBgImage = this.backgroundImages[index];
    clearInterval(this.intervalId);
    this.startAutoSlide();
  }

  typeText() {
    this.currentText = '';
    const fullText = this.typedTexts[this.currentIndex];
    let charIndex = 0;
  
    const typingInterval = setInterval(() => {
      if (charIndex < fullText.length) {
        this.currentText += fullText.charAt(charIndex);
        charIndex++;
        this.cdr.detectChanges(); // <-- inform Angular
      } else {
        clearInterval(typingInterval);
      }
    }, 100);
  }
  

  deleteText() {
    if (this.charIndex > 0) {
      this.currentText = this.currentText.slice(0, --this.charIndex);
      setTimeout(() => this.deleteText(), 50);
    } else {
      this.textIndex = (this.textIndex + 1) % this.typedTexts.length;
      setTimeout(() => this.typeText(), 500);
    }
  }
}


