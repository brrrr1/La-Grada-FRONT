import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  activeSection: 'usuarios' | 'equipos' | 'eventos' = 'usuarios';

  constructor(private router: Router) {}

  ngOnInit(): void {
  }

  setActiveSection(section: 'usuarios' | 'equipos' | 'eventos') {
    this.activeSection = section;
  }
} 