import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterByCategoria'
})
export class FilterByCategoriaPipe implements PipeTransform {

  transform(items: any[], categoriaId: number | null | string): any[] {
    console.log(categoriaId)
    if (categoriaId == 'null' || categoriaId == null) {
      return items;
    }

    return items.filter(item => item.categoria.id_categoria == categoriaId);
  }

}
