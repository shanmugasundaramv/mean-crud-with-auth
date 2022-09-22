import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchFilter'
})
export class SearchFilterPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    let searchUsers: string[] = [];
    if(args == "") {
      return value;
    }
    searchUsers = value.filter((user: any) => user.userName.indexOf(args) > -1);
    return searchUsers;
  }

}
