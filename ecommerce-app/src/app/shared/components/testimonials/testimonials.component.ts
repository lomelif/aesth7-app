import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-testimonials',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './testimonials.component.html'
})
export class TestimonialsComponent {
  testimonials = [
    {
      name: "María García",
      comment:
        "La calidad de la ropa es excelente y el servicio de atención al cliente es inmejorable. Totalmente recomendado.",
    },
    {
      name: "Carlos Rodríguez",
      comment:
        "Pedí varias camisas y llegaron en perfecto estado. El material es de muy buena calidad y las tallas son exactas.",
    },
    {
      name: "Laura Martínez",
      comment:
        "Me encanta la variedad de estilos que ofrecen. Siempre encuentro algo que se adapta a mi gusto y a buen precio.",
    },
  ]

}
