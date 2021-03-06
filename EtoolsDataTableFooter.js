import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';

import '@polymer/polymer/lib/elements/dom-repeat.js';
import '@polymer/paper-dropdown-menu/paper-dropdown-menu.js';
import '@polymer/paper-listbox/paper-listbox.js';
import '@polymer/paper-item/paper-item.js';
import '@polymer/paper-icon-button/paper-icon-button.js';
import '@polymer/iron-flex-layout/iron-flex-layout.js';

/**
 * `etools-data-table-footer`
 * @polymer
 * @customElement
 * @extends {PolymerElement}
 * @demo demo/index.html
 */
export class EtoolsDataTableFooter extends PolymerElement {
  static get template() {
    // language=HTML
    return html`
      <style>

        :host {
          display: block;
          font-size: 12px;
          color: var(--list-text-color, rgba(0, 0, 0, 0.54));
        }

        :host([do-not-show]) {
          display: none;
        }

        #table-footer paper-item {
          --paper-item-focused: {
            background-color: var(--list-secondary-color);
          };
          height: 24px; /* for IE */
        }

        iron-icon {
          color: var(--list-icon-color);
        }

        iron-icon:hover {
          color: var(--list-icon-hover-color);
        }

        #table-footer {
          @apply --layout-horizontal;
          @apply --layout-center;
          @apply --layout-end-justified;

          padding: 0 8px 0 16px;
          height: 48px;
          background-color: var(--list-bg-color, #ffffff);
        }

        #table-footer paper-icon-button {
          color: var(--list-disabled-icon-color, rgba(0, 0, 0, 0.64));
        }

        #table-footer paper-icon-button:not([disabled]) {
          color: var(--list-icon-color, #2b2b2b);
        }

        #table-footer paper-icon-button:not([disabled]):hover {
          color: var(--list-icon-hover-color, rgba(0, 0, 0, 0.87));
        }

        #rows {
          margin-right: 24px;
        }

        #range {
          margin: 0 32px;
        }

        paper-dropdown-menu {
          width: 40px;
          bottom: 9px;

          --paper-input-container-input: {
            color: var(--list-text-color, rgba(0, 0, 0, 0.54));
            font-size: 12px;
            height: 24px;
            /* For IE below */
            @apply --layout-horizontal;
            align-items: strech;
            max-width: 24px;
          };

          --paper-input-container-underline: {
            display: none;
          };
        }

        .pagination-item {
          @apply --layout-horizontal;
          @apply --layout-center;
        }

        .pagination-item paper-dropdown-menu {
          bottom: -1px;
        }

        /* Mobile view CSS */
        :host([low-resolution-layout]) #table-footer {
          padding: 8px 0;
          height: auto;
          @apply --layout-vertical;
          @apply --layout-start;
        }

        :host([low-resolution-layout]) #range {
          margin: 0 0 0 24px;
        }

        :host([low-resolution-layout]) .pag-btns {
          margin-left: -12px;
        }

      </style>

      <div id="table-footer">

        <span class="pagination-item">
          <span id="rows">Rows per page:</span>
          <paper-dropdown-menu vertical-align="bottom" horizontal-align="left" noink="" no-label-float>
            <paper-listbox slot="dropdown-content" attr-for-selected="name" selected="{{pageSize}}">
              <template is="dom-repeat" items="[[pageSizeOptions]]">
                <paper-item name\$="[[item]]">[[item]]</paper-item>
              </template>
            </paper-listbox>
          </paper-dropdown-menu>

          <span id="range">[[visibleRange.0]]-[[visibleRange.1]] of [[totalResults]]</span>
        </span>

        <span class="pagination-item pag-btns">
          <paper-icon-button icon="first-page" on-tap="_firstPage"
                             disabled\$="[[_pageBackDisabled(pageNumber)]]"></paper-icon-button>

          <paper-icon-button icon="chevron-left" on-tap="_pageLeft"
                             disabled\$="[[_pageBackDisabled(pageNumber)]]"></paper-icon-button>

          <paper-icon-button icon="chevron-right" on-tap="_pageRight"
                             disabled\$="[[_pageForwardDisabled(pageNumber, totalPages)]]"></paper-icon-button>

          <paper-icon-button icon="last-page" on-tap="_lastPage"
                             disabled\$="[[_pageForwardDisabled(pageNumber, totalPages)]]"></paper-icon-button>
        </span>

      </div>
    `;
  }

  static get is() {
    return 'etools-data-table-footer';
  }

  static get properties() {
    return {
      pageSize: {
        type: String,
        notify: true
      },

      pageSizeOptions: {
        type: Array,
        value: [5, 10, 25, 50]
      },

      pageNumber: {
        type: Number,
        notify: true
      },

      totalResults: {
        type: Number
      },

      totalPages: {
        type: Number,
        computed: '_computeTotalPages(pageSize, totalResults)'
      },

      visibleRange: {
        type: Array,
        notify: true,
        computed: '_computeVisibleRange(pageNumber, pageSize, totalResults, totalPages)'
      },

      doNotShow: {
        type: Boolean,
        computed: '_hideFooter(totalResults)',
        reflectToAttribute: true
      },

      lowResolutionLayout: {
        type: Boolean,
        value: false,
        reflectToAttribute: true
      }
    };
  }

  _pageLeft() {
    if (this.pageNumber > 1) {
      this.set('pageNumber', this.pageNumber - 1);
    }
  }

  _pageRight() {
    if (this.pageNumber < this.totalPages) {
      this.set('pageNumber', this.pageNumber + 1);
    }
  }

  _firstPage() {
    if (this.pageNumber > 1) {
      this.set('pageNumber', 1);
    }
  }

  _lastPage() {
    if (this.pageNumber < this.totalPages) {
      this.set('pageNumber', this.totalPages);
    }
  }

  _computeTotalPages(pageSize, totalResults) {
    let result = 1;
    if (pageSize < totalResults) {
      result = Math.ceil(totalResults / pageSize);
    }
    return result;
  }

  _computeVisibleRange(pageNumber, pageSize, totalResults, totalPages) {
    totalResults = Number(totalResults);
    pageSize = Number(pageSize);
    pageNumber = Number(pageNumber);
    totalPages = Number(totalPages);

    let start = 1;
    let end = totalResults;
    if (!totalResults) {
      start = 0;
    } else {
      if (pageNumber !== 1) {
        start = (pageNumber - 1) * pageSize + 1;
      }
      if (pageNumber !== totalPages) {
        end = start + pageSize - 1;
      }
    }

    return [start, end];
  }

  _pageBackDisabled(pageNumber) {
    return pageNumber === 1;
  }

  _pageForwardDisabled(pageNumber, totalPages) {
    return pageNumber === totalPages;
  }

  _hideFooter(totalResults) {
    return totalResults <= 5;
  }
}
