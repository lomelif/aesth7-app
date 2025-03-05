import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-service-features',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './service-features.component.html'
})
export class ServiceFeaturesComponent {

  @Input()
  public features: any;
  
  constructor(private sanitizer: DomSanitizer){}

  getSafeHtml(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html)
  }
}
