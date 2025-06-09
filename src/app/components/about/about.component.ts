import { Component, HostListener, OnInit, ElementRef, ViewChild } from '@angular/core';
import { environment } from '../../../environments/environment';

declare var google: any;

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  @ViewChild('mapContainer') mapContainer!: ElementRef;
  map: any;
  marker: any;

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
    const maxScroll = 300;
    this.logoScale = Math.min(2, 1 + (scrollPosition / maxScroll));
    this.logoOpacity = Math.max(0, 1 - (scrollPosition / maxScroll));
  }

  ngOnInit() {
    this.loadGoogleMapsScript().then(() => {
      setTimeout(() => {
        this.initMap();
      }, 200);
    });
  }

  loadGoogleMapsScript(): Promise<void> {
    return new Promise((resolve, reject) => {
      if ((window as any).google && (window as any).google.maps) {
        resolve();
        return;
      }
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${environment.googleMapsApiKey}`;
      script.async = true;
      script.defer = true;
      script.onload = () => resolve();
      script.onerror = (err) => reject(err);
      document.body.appendChild(script);
    });
  }

  initMap() {
    const location = { lat: 40.4168, lng: -3.7038 }; // Madrid coordinates
    const mapOptions = {
      center: location,
      zoom: 15,
      styles: [
        {
          "featureType": "all",
          "elementType": "geometry",
          "stylers": [{"color": "#242832"}]
        },
        {
          "featureType": "all",
          "elementType": "labels.text.stroke",
          "stylers": [{"lightness": -80}]
        },
        {
          "featureType": "administrative",
          "elementType": "labels.text.fill",
          "stylers": [{"color": "#444444"}]
        },
        {
          "featureType": "landscape",
          "elementType": "all",
          "stylers": [{"color": "#2a2e3b"}]
        },
        {
          "featureType": "poi",
          "elementType": "all",
          "stylers": [{"visibility": "off"}]
        },
        {
          "featureType": "road",
          "elementType": "all",
          "stylers": [{"color": "#3a3f4f"}]
        },
        {
          "featureType": "road.highway",
          "elementType": "all",
          "stylers": [{"visibility": "simplified"}]
        },
        {
          "featureType": "road.arterial",
          "elementType": "all",
          "stylers": [{"visibility": "simplified"}]
        },
        {
          "featureType": "road.local",
          "elementType": "all",
          "stylers": [{"visibility": "simplified"}]
        },
        {
          "featureType": "transit",
          "elementType": "all",
          "stylers": [{"visibility": "off"}]
        },
        {
          "featureType": "water",
          "elementType": "all",
          "stylers": [{"color": "#1e2533"}]
        }
      ]
    };

    this.map = new google.maps.Map(this.mapContainer.nativeElement, mapOptions);
    
    this.marker = new google.maps.Marker({
      position: location,
      map: this.map,
      title: 'La Grada',
      animation: google.maps.Animation.DROP
    });
  }

  openGallery(index: number) {
    this.currentImageIndex = index;
    this.showGallery = true;
    document.body.style.overflow = 'hidden';
  }

  closeGallery() {
    this.showGallery = false;
    document.body.style.overflow = '';
  }

  nextImage() {
    this.currentImageIndex = (this.currentImageIndex + 1) % this.images.length;
  }

  previousImage() {
    this.currentImageIndex = (this.currentImageIndex - 1 + this.images.length) % this.images.length;
  }

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