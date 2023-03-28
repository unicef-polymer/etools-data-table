import '@polymer/polymer/polymer-element.js';

export const dataTableStylesContent = `
  a {
    color: var(--list-primary-color, #0099ff);
  }

  #list {
    display: block;
    opacity: 1;
    transition: opacity 0.4s;
    background-color: var(--list-secondary-color, #ffffff);
    padding: 0;
  }

  #list.hidden {
    transition: none;
    opacity: 0;
  }

  *[slot="row-data"] {
    margin-top: 12px;
    margin-bottom: 12px;
  }
  *[slot="row-data"],
  *[slot="row-data-details"] {
    display: flex;
    flex-direction: row;
  }

  *[slot="row-data"] .col-data {
    display: inline-flex;
    line-height: 24px;
    align-items: center;
  }

  *[slot="row-data"] .truncate {
    display: inline-block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-top: auto;
    margin-bottom: auto;
  }

  etools-data-table-column,
  *[slot="row-data"] .col-data {
    box-sizing: border-box;
    padding-inline-end: 16px;
  }
  etools-data-table-column:last-child,
  *[slot="row-data"] .col-data:last-child {
    padding-inline-end: 0;
  }
  .row-details-content {
    font-size: 12px;
  }
  .row-details-content .rdc-title {
    display: inline-block;
    width: 100%;
    color: var(--list-secondary-text-color, #757575);
    font-weight: bold;
    margin-bottom: 10px;
  }

  .row-details-content .rdc-title.inline {
    width: auto;
    margin: 0;
    margin-inline-end: 8px;
  }

  /* Mobile view CSS */
  etools-data-table-row[medium-resolution-layout] *[slot="row-data"],
  etools-data-table-row[medium-resolution-layout] *[slot="row-data-details"] {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    box-sizing: border-box;
  }

  etools-data-table-row[medium-resolution-layout] *[slot="row-data"] .col-data {
    display: flex;
    justify-content: flex-start;
    flex: 1 0 calc(50% - 16px);
    max-width: calc(50% - 16px);
    padding: 8px;
    box-sizing: border-box;
  }

  etools-data-table-row[medium-resolution-layout] *[slot="row-data"] .truncate {
    display: flex;
    white-space: unset;
    overflow: unset;
    text-overflow: unset;
  }

  etools-data-table-row[low-resolution-layout] *[slot="row-data"],
  etools-data-table-row[low-resolution-layout] *[slot="row-data-details"] {
    display: block;
    max-width: 100%;
    box-sizing: border-box;
  }

  etools-data-table-row[low-resolution-layout] *[slot="row-data"] .col-data,
  etools-data-table-row[low-resolution-layout] *[slot="row-data-details"] > * {
    display: inline-block;
    width: 100%;
    max-width: 100%;
    padding: 8px 0;
    box-sizing: border-box;
  }

  etools-data-table-row[medium-resolution-layout] *[slot="row-data"] .col-data:before,
  etools-data-table-row[low-resolution-layout] *[slot="row-data"] .col-data:before {
    content: attr(data-col-header-label)": ";
    color: var(--list-secondary-text-color, #757575);
    font-weight: bold;
    margin-inline-end: 8px;
    vertical-align: top;
    min-height: 24px;
  }
`;

const template = document.createElement('template');
template.setAttribute('style', 'display: none;');
// languae=HTML
template.innerHTML = `<dom-module id="data-table-styles">
  <template>
    <style>
      ${dataTableStylesContent}
    </style>
  </template>
</dom-module>`;

document.head.appendChild(template.content);
