import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-contact-us',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.scss'
})
export class ContactUsComponent {
  // Properties to bind to the form fields
  contactForm = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };

  constructor() { }

  ngOnInit(): void {
    // ... (Your existing theme loading logic) ...
  }

  // Method to handle form submission (for demonstration)
  onSubmitContactForm(form: NgForm): void {
    if (form.valid) {
      console.log('Contact Form Submitted!', this.contactForm);
      // Here you would typically send this data to a backend service
      alert('Thank you for your message! We will get back to you soon.');
      form.resetForm(); // Reset the form after successful submission
    } else {
      alert('Please fill out all required fields.');
    }
  }

}
