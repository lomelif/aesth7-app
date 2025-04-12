import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HeaderComponent } from "../../../../shared/components/header/header.component";
import { CatalogComponent } from "../../components/catalog/catalog.component";
import { FooterComponent } from "../../../../shared/components/footer/footer.component";

@Component({
  selector: 'app-hoodie-catalog-page',
  standalone: true,
  imports: [HeaderComponent, CatalogComponent, FooterComponent],
  templateUrl: './hoodie-catalog-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HoodieCatalogPageComponent { }
