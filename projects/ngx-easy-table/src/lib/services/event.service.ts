import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  private event = new Subject<any>();

  emitData(data: any) {
    this.event.next(data);
  }

  getSubject() {
    return this.event;
  }
}
