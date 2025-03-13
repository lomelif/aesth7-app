import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Features } from '../../interfaces/info.interface';

@Component({
  selector: 'app-service-features',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './service-features.component.html'
})
export class ServiceFeaturesComponent {

  @Input()
  public features: Features[] = [];
  
  constructor(private sanitizer: DomSanitizer){}

  getSafeHtml(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html)
  }
}
