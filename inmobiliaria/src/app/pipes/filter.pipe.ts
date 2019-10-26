import { Pipe, PipeTransform } from '@angular/core';
import { Inmueble } from '../../models/inmueble';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, arg: any, arg2: any, arg3: any): any {
    
    const resultPost = [];

    for (const post of value) {

      if (post.tipo.indexOf(arg) > -1 && post.estado.indexOf(arg2) > -1 && post.titulo.toLowerCase().indexOf(arg3.toLowerCase()) > -1) {
        resultPost.push(post);
      }

    }

    return resultPost;

  }

}
