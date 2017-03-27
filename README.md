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
`--layout-flex` |  | ``
`--layout-horizontal` |  | ``
`--layout-center` |  | ``
`--layout-wrap` |  | ``
`--layout-end-justified` |  | ``

`--list-primary-color` |  | ``
`--list-secondary-color` |  | ``
`--list-text-color` |  | ``
`--list-secondary-text-color` |  | ``
`--list-bg-color` |  | ``
`--list-divider-color` |  | ``
`--list-icon-hover-color` |  | ``
`--list-icon-color` |  | ``


## Install

```bash
$ bower install --save etools-data-table
```

## Preview element locally

Install needed dependencies by running: `$ bower install`.
Make sure you have the [Polymer CLI](https://www.npmjs.com/package/polymer-cli) installed. Then run `$ polymer serve` to serve your element application locally.

## Running Tests

You need to have `web-component-tester` installed (if not run `npm install -g web-component-tester`)
```bash
$ wct
```
or
```bash
$ wct -p
```
