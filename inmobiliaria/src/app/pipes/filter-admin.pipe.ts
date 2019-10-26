import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterAdmin'
})
export class FilterAdminPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    
    const resultPosts = [];

    for (const post of value) {
      if (post.oferta.indexOf(arg) > -1) {
        resultPosts.push(post);
      }
    }

    return resultPosts;

  }

}
