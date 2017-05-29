# \<etools-data-table\>

Etools data table UI

### Element properties

#### etools-data-table-header
 * label - String
 * no-collapse - Boolean, default: false
#### etools-data-table-column
 * field - String
 * sortable - Boolean, default: false
#### etools-data-table-row
 * details-opened - Boolean, default: false
 * no-collapse - Boolean, default: false
#### etools-data-table-footer
 * page-size - Number
 * page-number - Number
 * total-results - Number
 * visible-range - Array - notifies
### Element events:
 #### etools-data-table-footer
 * on-page-size-changed - when a different page size is selected
 * on-page-number-changed - when page navigation occured

## Usage
```html
      <etools-data-table-header id="listHeader" label="[[visibleRange.0]]-[[visibleRange.1]] of [[totalResults]] results to show">
        <etools-data-table-column class="col-2" field="number" sortable>
          Reference #
        </etools-data-table-column>
        <etools-data-table-column class="col-4" field="partner_name"  sortable>
          Government Partner
        </etools-data-table-column>
        <etools-data-table-column class="flex-c" field="created_at">
          Years
        </etools-data-table-column>
      </etools-data-table-header>

      <template id="rows" is="dom-repeat" items="[[governments]]" as="entry">
        <etools-data-table-row details-opened="[[detailsOpened]]">
          <div slot="row-data">
            <span class="col-data">
              [[entry.number]]
            </span>
            <span class="col-data">
                [[entry.partner_name]]
            </span>
            <span class="col-data">
                [[entry.years]]
            </span>
          </div>
          <div slot="row-data-details">
            <div class="row-details-content">
              <span class="rdc-title">Unicef Focal Point</span>
              <span>[[entry.unicef_focal_point_names]]</span>
            </div>
            <div class="row-details-content">
              <span class="rdc-title">Sectors</span>
              <span>[[entry.sectors]]</span>
            </div>
          </div>
        </etools-data-table-row>
      </template>

      <etools-data-table-footer
          page-size="[[pageSize]]"
          page-number="[[pageNumber]]"
          total-results="[[totalResults]]"
          visible-range="{{visibleRange}}"
          on-page-size-changed="_pageSizeSelected"
          on-page-number-changed="_pageNumberChanged">
      </etools-data-table-footer>
```
## Styling

Custom property | Description | Default
----------------|-------------|----------
`--list-primary-color` | Color of links and button texts | `#40c4ff`
`--list-secondary-color` | Color of dropdown selected element background | `#ffffff`
`--list-divider-color` | Color of borders and dividers | `#9D9D9D`
`--list-bg-color` | Primary background color | `#ffffff`
`--list-second-bg-color` | Background on hover and of details box | `#eeeeee`
`--list-text-color` | Primary text color | `#2b2b2b`
`--list-secondary-text-color` | Text color for the titles | `#757575`
`--list-icon-color` | Icon color | `#2b2b2b`
`--list-icon-hover-color` | Icon hover color | `rgba(0, 0, 0, 0.87)`
`--list-disabled-icon-color` | Disabled icon color | `rgba(0, 0, 0, 0.64)`


## Install

```bash
$ bower install --save etools-data-table
```

## Preview element locally

Install needed dependencies by running: `$ bower install`.
Make sure you have the [Polymer CLI](https://www.npmjs.com/package/polymer-cli) installed. Then run `$ polymer serve` to serve your element application locally.

## Linting the code

Innstall local npm packages (run `npm install`)
Then just run the linting task

```bash
$ npm run lint
```
You should also use polylint. If you don't have Polylint installed run `npm install -g polylint`.
Then just run the linter on each file you wish to check like so

```bash
$ polylint -i filename.html
```
At the moment polylint crashes if it encounters a missing import. If that happens, temporarily comment out such imports and run the command again.

## Running Tests

You need to have `web-component-tester` installed (if not run `npm install -g web-component-tester`)
```bash
$ wct
```
or
```bash
$ wct -p
```
