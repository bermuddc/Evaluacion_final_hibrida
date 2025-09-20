import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormat',
  standalone: true
})
export class DateFormatPipe implements PipeTransform {

  transform(value: Date | string): string {
   
    const date = new Date(value);
    
   
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long', 
      day: 'numeric'
    };
    
    return date.toLocaleDateString('es-ES', options);
  }

}