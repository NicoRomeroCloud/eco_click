import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterBySKU'
})
export class FilterBySKUPipe implements PipeTransform {

  transform(items: any[], sortBy: string): any[] {
    if (!Array.isArray(items)) {
      return items;
    }

    items.sort((a,b) => {
      switch (sortBy) {
        case 'sku':
          if (a.sku < b.sku) return -1;
          if (a.sku > b.sku) return 1;
          break;
        case 'nombre':
          if (a.nombre < b.nombre) return -1;
          if (a.nombre > b.nombre) return 1;
          break;
        case 'precio':
          if (a.precio_lista < b.precio_lista) return -1;
          if (a.precio_lista > b.precio_lista) return 1;
          break;
        default:
          return 0;
      }
  
      return 0;
    })

    return items;
  }

}
