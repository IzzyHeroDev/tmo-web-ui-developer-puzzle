import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'truncateText',
})
export class TruncatePipe implements PipeTransform {
    transform(value: string, max: number = 40, sufix: string = '...'): string {
        return value && value.length > max
            ? `${value.slice(0, max)}${sufix}`
            : value;
    }
}