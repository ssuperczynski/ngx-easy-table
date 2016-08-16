///<reference path="./../typings/browser/ambient/es6-shim/index.d.ts"/>
import {platformBrowserDynamic}    from '@angular/platform-browser-dynamic';
import { AppModule } from './app.module';

platformBrowserDynamic().bootstrapModule(AppModule);
