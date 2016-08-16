![Imgur](http://i.imgur.com/gwjpUqe.png "logo")


[![npm version](https://badge.fury.io/js/ng2-easy-table.svg)](https://badge.fury.io/js/ng2-easy-table)
[![Build Status](https://travis-ci.org/ssuperczynski/ng2-easy-table.svg?branch=master)](https://travis-ci.org/ssuperczynski/ng2-easy-table)

Proudly powered by [![Imgur](http://i.imgur.com/qbbb6ah.png)](http://espeo.eu/)

App currently under heavy development due to angular-rc5.
Beta version. Component may contains some issues, but feel free to add it to your page!

<h3><a href="http://angular2-table.espeo.pl/" target="_blank">DEMO</a></h3>

This table always will be easy to add to every page.

#Installation

`npm install ng2-easy-table`
### app.component.ts

```typescript
///<reference path="./../typings/browser/ambient/es6-shim/index.d.ts"/>
import {Component}     from '@angular/core';
import {bootstrap}     from '@angular/platform-browser-dynamic';
import {AppComponent}  from 'ng2-easy-table/app/app.component';
import {ConfigService} from "./config-service";

@Component({
  selector: 'app',
  directives: [AppComponent],
  providers: [ConfigService],
  template: `
    <ng2-table [configuration]="configuration"></ng2-table>
  `
})
export class App {
  constructor(private configuration:ConfigService) {}
}

bootstrap(App, [ConfigService]);
```

### config-service.ts:

```typescript
import {Injectable} from "@angular/core";
@Injectable()
export class ConfigService {
  public searchEnabled = false;
  public orderEnabled = true;
  public globalSearchEnabled = false;
  public footerEnabled = false;
  public paginationEnabled = false;
  public exportEnabled = false;
  public editEnabled = false;
  public resourceUrl = "app/data.json";
  public rows = 10;
}
```
![table](http://i.imgur.com/yqlYtVR.png "table")

###Available config settings:

| field               |      type      |  options   | example                                     |
|---------------------|:--------------:|:----------:|---------------------------------------------|
| searchEnabled       | bool           | true false | public searchEnabled = true;                |
| exportEnabled       | bool           | true false | public exportEnabled = true;                |
| orderEnabled        | bool           | true false | public orderEnabled = true;                 |
| paginationEnabled   | bool           | true false | public paginationEnabled = true;            |
| globalSearchEnabled | bool           | true false | public globalSearchEnabled = true;          |
| resourceUrl         | string         |            | public resourceUrl = "api/v1/persons.json"; |
| rows                | int            |            | public rows = 10;                           |


If you have problem displaying table, check `systemsj.config.js` configuration

```js
(function(global) {

  // map tells the System loader where to look for things
  var map = {
    'app':                        'app', // 'dist',
    'rxjs':                       'node_modules/rxjs',
    'angular2-in-memory-web-api': 'node_modules/angular2-in-memory-web-api',
    '@angular':                   'node_modules/@angular',
    'ng2-easy-table':             'node_modules/ng2-easy-table/dist'
  };

  // packages tells the System loader how to load
  // when no filename and/or no extension
  var packages = {
    'app':                        { main: 'index.component.js',  defaultExtension: 'js' },
    'rxjs':                       { defaultExtension: 'js' },
    'angular2-in-memory-web-api': { defaultExtension: 'js' },
    'ng2-easy-table':             { format: 'register', defaultExtension: 'js' },
     dist:                        { format: 'register', defaultExtension: 'js' }
  };

  var packageNames = [
    '@angular/common',
    '@angular/compiler',
    '@angular/core',
    '@angular/http',
    '@angular/platform-browser',
    '@angular/platform-browser-dynamic',
    '@angular/router',
    '@angular/router-deprecated',
    '@angular/testing',
    '@angular/upgrade'
  ];

  // add package entries for angular packages in the form
  // '@angular/common': { main: 'index.js', defaultExtension: 'js' }
  packageNames.forEach(function(pkgName) {
    packages[pkgName] = { main: 'index.js', defaultExtension: 'js' };
  });

  var config = {
    map: map,
    packages: packages
  };

  // filterSystemConfig - index.html's chance
  // to modify config before we register it.
  if (global.filterSystemConfig) { global.filterSystemConfig(config); }

  System.config(config);

})(this);
```


run tests by typing:
`npm test`