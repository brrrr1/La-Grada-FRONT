import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {
  images = [
    { src: 'assets/info1.webp', alt: 'La Grada Experience' },
    { src: 'assets/info 2.jpg', alt: 'La Grada Atmosphere' },
    { src: 'assets/IMG_0958-1024x768.jpg', alt: 'La Grada View' }
  ];

  currentImageIndex = 0;
  showGallery = false;
  logoScale = 1;
  logoOpacity = 1;

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    const scrollPosition = window.scrollY;
    const maxScroll = 300; // Adjust this value to control when the animation completes
    
    // Calculate scale and opacity based on scroll position
    this.logoScale = Math.min(2, 1 + (scrollPosition / maxScroll));
    this.logoOpacity = Math.max(0, 1 - (scrollPosition / maxScroll));
  }

  openGallery(index: number) {
    this.currentImageIndex = index;
    this.showGallery = true;
    document.body.style.overflow = 'hidden'; // Prevent scrolling when gallery is open
  }

  closeGallery() {
    this.showGallery = false;
    document.body.style.overflow = ''; // Restore scrolling
  }

  nextImage() {
    this.currentImageIndex = (this.currentImageIndex + 1) % this.images.length;
  }

  previousImage() {
    this.currentImageIndex = (this.currentImageIndex - 1 + this.images.length) % this.images.length;
  }

  // Handle keyboard navigation
  handleKeydown(event: KeyboardEvent) {
    if (!this.showGallery) return;
    
    switch(event.key) {
      case 'ArrowLeft':
        this.previousImage();
        break;
      case 'ArrowRight':
        this.nextImage();
        break;
      case 'Escape':
        this.closeGallery();
        break;
    }
  }
} 