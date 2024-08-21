Library created using:
- https://angular.dev/tools/libraries/creating-libraries
- https://ngrx.io/guide/store
- https://ngrx.io/guide/effects

Project has two package.json:

- first to serve demo with examples
- second (located in project/ngx-easy-table), contains items only for table component.

If you do changes in `project/ngx-easy-table` make sure to run `npm run watch:table` and then `npm run start`

To run tests run `npm run cy:serve` and then `npm run cy:open`
