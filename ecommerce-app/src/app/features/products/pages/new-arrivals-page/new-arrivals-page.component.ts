import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NewArrivalsComponent } from "../../components/catalog/catalog.component";
import { HeaderComponent } from "../../../../shared/components/header/header.component";
import { FooterComponent } from "../../../../shared/components/footer/footer.component";

@Component({
  selector: 'app-new-arrivals-page',
  standalone: true,
  imports: [NewArrivalsComponent, HeaderComponent, FooterComponent],
  templateUrl: './new-arrivals-page.component.html',
  styleUrl: './new-arrivals-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewArrivalsPageComponent { }
