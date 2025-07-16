import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-our-impacts',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './our-impacts.component.html',
  styleUrl: './our-impacts.component.scss'
})
export class OurImpactsComponent {
  impactStats = [
    { value: 180, label: 'Projects Completed', icon: 'fas fa-check-circle' },
    { value: 95, label: 'Clients Served', icon: 'fas fa-handshake' },
    { value: 8, label: 'Countries Covered', icon: 'fas fa-globe-americas' },
    { value: 10, label: 'Govt. Projects', icon: 'fas fa-university' }
  ];

}
