import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { FooterComponent } from '../../components/footer/footer.component';
import { HeaderComponent } from '../../components/header/header.component';
import { HeroComponent } from '../../components/hero/hero.component';
import { BestSellersComponent } from '../../components/best-sellers/best-sellers.component';
import { BannerComponent } from "../../components/banner/banner.component";

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, HeaderComponent, HeroComponent, BestSellersComponent, FooterComponent, BannerComponent],
  templateUrl: './home-page.component.html'
})
export class HomePageComponent {
  

  currentYear = new Date().getFullYear()

  categories = ["Mujer", "Hombre", "Accesorios", "Calzado"]

  

  
}
