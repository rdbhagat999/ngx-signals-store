import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'genderTitle',
  standalone: true,
})
export class GenderTitlePipe implements PipeTransform {
  transform(name: string, gender: string): string {
    switch (gender) {
      case 'male':
        return `Mr. ${name}`;
      case 'female':
        return `Ms. ${name}`;
      default:
        return name;
    }
  }
}
