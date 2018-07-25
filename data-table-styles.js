import '@polymer/polymer/polymer-element.js';
import '@polymer/iron-flex-layout/iron-flex-layout.js';

const $_documentContainer = document.createElement('template');
$_documentContainer.setAttribute('style', 'display: none;');
// languae=HTML
$_documentContainer.innerHTML = `<dom-module id="data-table-styles">
  <template>
    <style>
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
        @apply --layout-horizontal;
        @apply --layout-flex;
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
        padding-right: 16px;
      }
      etools-data-table-column:last-child,
      *[slot="row-data"] .col-data:last-child {
        padding-right: 0;
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
      
      @media screen and (max-width: 767px) {
        etools-data-table-header {
          display: none;
        }
        
        *[slot="row-data"],
        *[slot="row-data-details"] {
          display: block;
          width: 100%;
        }
        
        *[slot="row-data"] .col-data,
        *[slot="row-data-details"] > * {
          display: flex;
          width: 100%;
          max-width: 100%;
          padding: 8px 0;
          box-sizing: border-box;
        }
        
        *[slot="row-data"] .col-data:before {
          content: attr(data-col-header-label)": ";
          color: var(--list-secondary-text-color, #757575);
          font-weight: bold;
          margin-right: 8px;
        }
        
      }
      
    </style>
  </template>
</dom-module>`;

document.head.appendChild($_documentContainer.content);
