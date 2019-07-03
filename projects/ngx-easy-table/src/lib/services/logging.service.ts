import { EventEmitter, Injectable, Output } from '@angular/core';
import { Config } from '..';

@Injectable()
export class LoggingService {
  @Output() readonly event = new EventEmitter<{ event: string, value: any }>();
  private config: Config;

  public setConfig(config: Config) {
    this.config = config;
  }

  public emitEvent(event: string, value: any): void {
    // TODO make as observable
    this.event.emit({ event, value });
    if (this.config.persistState) {
      localStorage.setItem(event, JSON.stringify(value));
    }
    if (this.config.logger) {
      // tslint:disable-next-line:no-console
      console.log({ event, value });
    }
  }
}
