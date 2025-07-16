import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-our-technology',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './our-technology.component.html',
  styleUrl: './our-technology.component.scss'
})
export class OurTechnologyComponent {

  technologies = [
    { iconClass: 'fab fa-angular', name: 'Angular', colorClass: 'text-danger' },
    { iconClass: 'fab fa-react', name: 'React', colorClass: 'text-info' },
    { iconClass: 'fab fa-vuejs', name: 'Vue.js', colorClass: 'text-success' },
    { iconClass: 'fab fa-node-js', name: 'Node.js', colorClass: 'text-success' },
    { iconClass: 'fab fa-php', name: 'PHP', colorClass: 'text-primary' },
    { iconClass: 'fab fa-js-square', name: 'JavaScript', colorClass: 'text-warning' },
    { iconClass: 'fab fa-python', name: 'Python', colorClass: 'text-primary' },
    { iconClass: 'fab fa-html5', name: 'HTML5', colorClass: 'text-warning' },
    { iconClass: 'fab fa-css3-alt', name: 'CSS3', colorClass: 'text-info' },
    { iconClass: 'fab fa-swift', name: 'Swift', colorClass: 'text-danger' },
    { iconClass: 'fab fa-java', name: 'Java', colorClass: 'text-danger' },
    { iconClass: 'fab fa-android', name: 'Android', colorClass: 'text-success' }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
