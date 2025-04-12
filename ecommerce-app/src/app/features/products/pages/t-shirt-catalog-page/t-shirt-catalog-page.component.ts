import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HeaderComponent } from "../../../../shared/components/header/header.component";
import { CatalogComponent } from "../../components/catalog/catalog.component";
import { FooterComponent } from "../../../../shared/components/footer/footer.component";

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [HeaderComponent, CatalogComponent, FooterComponent],
  templateUrl: './t-shirt-catalog-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TShirtCatalogPageComponent { }
