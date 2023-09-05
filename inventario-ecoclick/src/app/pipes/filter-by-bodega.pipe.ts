import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterByBodega'
})
export class FilterByBodegaPipe implements PipeTransform {

  transform(items: any[], bodegaId: number | null | string): any[] {
    if (bodegaId == 'null' || bodegaId == null) {
      return items;
    }

    return items.filter(item => item.bodegas.some( (bodega:any) => bodega.id_bodega == bodegaId));
  }

}
