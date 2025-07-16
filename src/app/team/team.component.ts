import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-team',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './team.component.html',
  styleUrl: './team.component.scss'
})
export class TeamComponent {
    teamMembers = [
    {
      name: 'Rahul Sharma',
      position: 'Founder & CEO',
      image: 'team1.jpg', // Make sure this path is correct in your assets folder
      linkedin: 'https://linkedin.com/in/rahul',
      twitter: ''
    },
    {
      name: 'Priya Mehta',
      position: 'CTO & Architect',
      image: 'team2.jpg', // Make sure this path is correct in your assets folder
      linkedin: '',
      twitter: 'https://twitter.com/priyamehta'
    },
    {
      name: 'Amit Patel',
      position: 'Marketing Lead',
      image: 'team3.jpg', // Make sure this path is correct in your assets folder
      linkedin: 'https://linkedin.com/in/amit',
      twitter: ''
    }
  ];

  constructor() {
    // You can initialize any additional properties or services here if needed
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    
  }
}
