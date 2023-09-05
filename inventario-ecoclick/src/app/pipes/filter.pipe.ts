import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(items: any[], term: string): any[] {
    if (!term) {
      return items;
    }

    return items.filter(item => {
      const propiedad1 = item.nombre.toLowerCase();
      const propiedad2 = item.sku.toLowerCase();
      return (propiedad1.includes(term.toLowerCase()) || propiedad2.includes(term.toLowerCase()));
    });
  }

}
