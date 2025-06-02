import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent {
  @Input() message: string = '';
  @Input() type: 'success' | 'error' | 'info' = 'info';
  @Input() duration: number = 10000; // ms
  @Input() show: boolean = false;
  @Output() closed = new EventEmitter<void>();

  ngOnChanges() {
    if (this.show && this.duration > 0) {
      setTimeout(() => {
        this.close();
      }, this.duration);
    }
  }

  close() {
    this.closed.emit();
  }
} 