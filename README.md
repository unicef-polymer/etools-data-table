# \<etools-data-table\>

Etools data table UI

## Usage

```html
<etools-data-table-header
  id="listHeader"
  label="[[visibleRange.0]]-[[visibleRange.1]] of [[totalResults]] results to show"
>
  <etools-data-table-column class="col-2" field="number" sortable> Reference # </etools-data-table-column>
  <etools-data-table-column class="col-4" field="partner_name" sortable> Government Partner </etools-data-table-column>
  <etools-data-table-column class="flex-c" field="created_at"> Years </etools-data-table-column>
</etools-data-table-header>

<template id="rows" is="dom-repeat" items="[[governments]]" as="entry">
  <etools-data-table-row details-opened="[[detailsOpened]]">
    <div slot="row-data">
      <span class="col-data"> [[entry.number]] </span>
      <span class="col-data"> [[entry.partner_name]] </span>
      <span class="col-data"> [[entry.years]] </span>
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
  on-page-number-changed="_pageNumberChanged"
>
</etools-data-table-footer>
```

## Styling

| Custom property                                              | Description                                   | Default               |
| ------------------------------------------------------------ | --------------------------------------------- | --------------------- |
| `--list-primary-color`                                       | Color of links and button texts               | `#40c4ff`             |
| `--list-secondary-color`                                     | Color of dropdown selected element background | `#ffffff`             |
| `--list-divider-color`                                       | Color of borders and dividers                 | `#9D9D9D`             |
| `--list-bg-color`                                            | Primary background color                      | `#ffffff`             |
| `--list-second-bg-color`                                     | Background on hover and of details box        | `#eeeeee`             |
| `--list-text-color`                                          | Primary text color                            | `#2b2b2b`             |
| `--list-secondary-text-color`                                | Text color for the titles                     | `#757575`             |
| `--list-icon-color`                                          | Icon color                                    | `#2b2b2b`             |
| `--list-icon-hover-color`                                    | Icon hover color                              | `rgba(0, 0, 0, 0.87)` |
| `--list-disabled-icon-color`                                 | Disabled icon color                           | `rgba(0, 0, 0, 0.64)` |
| `etools-data-table-row::part(edt-list-row-collapse-wrapper)` | Row collapsible details shadow part           | `{}`                  |
| `etools-data-table-row::part(edt-list-row-wrapper)`          | Row wrapper shadow part                       | `{}`                  |
| `etools-data-table-row::part(edt-icon-wrapper)`              | Icon wrapper shadow part                      | `{}`                  |
| `etools-data-table-header::part(edt-data-table-header)`      | Data table header shadow part                 | `{}`                  |
| `etools-data-table-header::part(edt-header-title)`           | Header title shadow part                      | `{}`                  |
| `etools-data-table-header::part(edt-header-columns)`         | Header columns shadow part                    | `{}`                  |
| `etools-data-table-column::part(edt-list-column-label)`      | List columns shadow part                      | `{}`                  |
| `--list-row-wrapper-padding-inline`                          | Start-End padding                             | `0 24px`              |

## Install

TODO: create npm package

```bash
$ npm i --save @unicef-polymer/etools-data-table
```

## Preview element locally

Install needed dependencies by running: `$ npm install`.
Make sure you have the [Polymer CLI](https://www.npmjs.com/package/polymer-cli) installed. Then run `$ polymer serve` to serve your element application locally.

Update demo interface: `$ polymer analyze demo/index.html > analysis.json`

## Linting the code

Install local npm packages (run `npm install`)
Then just run the linting task

```bash
$ npm run lint
```

## Running Tests

TODO: improve and add more tests

```
$ polymer test
```

## Circle CI

Package will be automatically published after tag push (`git tag 1.2.3` , `git push --tags`). Tag name must correspond to SemVer (Semantic Versioning) rules.  
Examples:

| Version match      | Result   |
| ------------------ | -------- |
| `1.2.3`            | match    |
| `1.2.3-pre`        | match    |
| `1.2.3+build`      | match    |
| `1.2.3-pre+build`  | match    |
| `v1.2.3-pre+build` | match    |
| `1.2`              | no match |

You can see more details [here](https://rgxdb.com/r/40OZ1HN5)
