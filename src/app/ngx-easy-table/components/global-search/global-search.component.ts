import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'global-search',
  templateUrl: './global-search.html',
})

/**
 * From version 5.0 GlobalSearchComponent will be deprecated,
 * and from version 6.0 moved to GlobalSearchComponent plugin
 */
export class GlobalSearchComponent {
  @Output() globalUpdate = new EventEmitter();
}
