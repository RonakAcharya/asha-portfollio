import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-our-major-work',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './our-major-work.component.html',
  styleUrl: './our-major-work.component.scss'
})
export class OurMajorWorkComponent {
  majorProjects = [
    {
      title: 'AGRI INSURANCE TPI WORK',
      duration: '2018-2021',
      description: 'Large-scale assessment and verification across multiple regions, ensuring data accuracy and policy effectiveness for agricultural insurance programs.'
    },
    {
      title: 'SWACHH BHARAT MISSION',
      duration: '2018-2023',
      description: 'Comprehensive quality monitoring, real-time reporting, and national dashboard management to support the mission\'s sanitation goals nationwide.'
    },
    {
      title: 'QCI – GUJARAT TOURISM',
      duration: 'Ongoing', // Updated from original as no end year given
      description: 'On-site assessments to enhance tourism standards, improve reporting structures, and drive quality benchmarks across various tourist destinations in Gujarat.'
    }
  ];

}
