import {LitElement, html} from 'lit-element';
import '@polymer/paper-dropdown-menu/paper-dropdown-menu.js';
import '@polymer/paper-listbox/paper-listbox.js';
import '@polymer/paper-item/paper-item.js';
import '@polymer/paper-icon-button/paper-icon-button.js';
import {getTranslation} from './utils/translate.js';

/**
 * `etools-data-table-footer`
 * @LitElement
 * @customElement
 * @extends {LitElement}
 * @demo demo/index.html
 */
export class EtoolsDataTableFooter extends LitElement {
  render() {
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
          }
          height: 24px; /* for IE */
        }

        iron-icon {
          color: var(--list-icon-color);
        }

        iron-icon:hover {
          color: var(--list-icon-hover-color);
        }

        #table-footer {
          display: flex;
          flex-direction: row;
          justify-content: flex-end;
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
          margin-inline-end: 24px;
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
            align-items: strech;
            max-width: 24px;
          }

          --paper-input-container-underline: {
            display: none;
          }
        }

        .pagination-item {
          display: flex;
          flex-direction: row;
          align-items: center;
        }

        .pagination-item paper-dropdown-menu {
          bottom: -1px;
        }

        /* Mobile view CSS */
        :host([low-resolution-layout]) #table-footer {
          padding: 8px 0;
          height: auto;
          display: flex;
          flex-direction: column;
          justify-content: start;
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
          <span id="rows">${this.rowsPerPageText || getTranslation(this.language, 'ROWS_PER_PAGE')}</span>
          <paper-dropdown-menu vertical-align="bottom" horizontal-align="left" noink="" no-label-float>
            <paper-listbox slot="dropdown-content" attr-for-selected="name" .selected="${this.pageSize}">
              ${(this.pageSizeOptions || []).map(
                (item) =>
                  html` <paper-item name="${item}" @click="${() => (this.pageSize = item)}">${item}</paper-item>`
              )}
            </paper-listbox>
          </paper-dropdown-menu>

          <span id="range"
            >${`${this.visibleRange[0]}-${this.visibleRange[1]} ${getTranslation(this.language, 'OF')} ${
              this.totalResults
            }`}</span
          >
        </span>

        <span class="pagination-item pag-btns">
          <paper-icon-button
            icon="${this.direction === 'ltr' ? 'first-page' : 'last-page'}"
            @click="${this._firstPage}"
            ?disabled="${this._pageBackDisabled(this.pageNumber)}"
          ></paper-icon-button>

          <paper-icon-button
            icon="${this.direction === 'ltr' ? 'chevron-left' : 'chevron-right'}"
            @click="${this._pageLeft}"
            ?disabled="${this._pageBackDisabled(this.pageNumber)}"
          ></paper-icon-button>

          <paper-icon-button
            icon="${this.direction === 'ltr' ? 'chevron-right' : 'chevron-left'}"
            @click="${this._pageRight}"
            ?disabled="${this._pageForwardDisabled(this.pageNumber, this.totalPages)}"
          ></paper-icon-button>

          <paper-icon-button
            icon="${this.direction === 'ltr' ? 'last-page' : 'first-page'}"
            @click="${this._lastPage}"
            ?disabled="${this._pageForwardDisabled(this.pageNumber, this.totalPages)}"
          ></paper-icon-button>
        </span>
      </div>
    `;
  }

  connectedCallback() {
    super.connectedCallback();
    document.addEventListener('language-changed', this.handleLanguageChange.bind(this));
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener('language-changed', this.handleLanguageChange.bind(this));
  }

  handleLanguageChange(e) {
    this.language = e.detail.language;
    this.direction = this.language === 'ar' ? 'rtl' : 'ltr';
  }

  static get is() {
    return 'etools-data-table-footer';
  }

  set pageSize(pageSize) {
    if (this._pageSize !== pageSize) {
      this._pageSize = pageSize;
      this._computeTotalPages(this.pageSize, this.totalResults);
      this._computeVisibleRange(this.pageNumber, this.pageSize, this.totalResults, this.totalPages);
      this._dispatchEvent('page-size-changed', this.pageSize);
    }
  }

  get pageSize() {
    return this._pageSize;
  }

  set pageNumber(pageNumber) {
    if (this._pageNumber !== pageNumber) {
      this._pageNumber = pageNumber;
      this._computeVisibleRange(this.pageNumber, this.pageSize, this.totalResults, this.totalPages);
      this._dispatchEvent('page-number-changed', this.pageNumber);
    }
  }

  get pageNumber() {
    return this._pageNumber;
  }

  set totalResults(totalResults) {
    this._totalResults = totalResults;
    this._computeTotalPages(this.pageSize, this.totalResults);
    this._computeVisibleRange(this.pageNumber, this.pageSize, this.totalResults, this.totalPages);
    this._hideFooter(this.totalResults);
    this.requestUpdate();
  }

  get totalResults() {
    return this._totalResults;
  }

  static get properties() {
    return {
      language: {
        type: String
      },
      direction: {
        type: String
      },
      pageSize: {
        type: String
      },
      pageSizeOptions: {
        type: Array
      },
      pageNumber: {
        type: Number
      },
      totalResults: {
        type: Number
      },
      totalPages: {
        type: Number
      },
      visibleRange: {
        type: Array
      },
      doNotShow: {
        type: Boolean,
        reflect: true,
        attribute: 'do-not-show'
      },
      lowResolutionLayout: {
        type: Boolean,
        reflect: true,
        attribute: 'low-resolution-layout'
      },
      rowsPerPageText: {
        type: String
      }
    };
  }

  constructor() {
    super();
    this.initializeProperties();
  }

  initializeProperties() {
    this.pageSizeOptions = [5, 10, 25, 50];
    this.lowResolutionLayout = false;
    this.direction = 'ltr';
    if (!this.language) {
      this.language = window.localStorage.defaultLanguage || 'en';
      this.direction = this.language === 'ar' ? 'rtl' : 'ltr';
    }
  }

  _pageLeft() {
    if (this.pageNumber > 1) {
      this.pageNumber = this.pageNumber - 1;
    }
  }

  _pageRight() {
    if (this.pageNumber < this.totalPages) {
      this.pageNumber = this.pageNumber + 1;
    }
  }

  _firstPage() {
    if (this.pageNumber > 1) {
      this.pageNumber = 1;
    }
  }

  _lastPage() {
    if (this.pageNumber < this.totalPages) {
      this.pageNumber = this.totalPages;
    }
  }

  _computeTotalPages(pageSize, totalResults) {
    let result = 1;
    if (pageSize < totalResults) {
      result = Math.ceil(totalResults / pageSize);
    }
    this.totalPages = result;
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

    if (JSON.stringify(this.visibleRange) !== JSON.stringify([start, end])) {
      this.visibleRange = [start, end];
      this._dispatchEvent('visible-range-changed', this.visibleRange);
    }
  }

  _pageBackDisabled(pageNumber) {
    return pageNumber === 1;
  }

  _pageForwardDisabled(pageNumber, totalPages) {
    return pageNumber === totalPages;
  }

  _hideFooter(totalResults) {
    this.doNotShow = totalResults <= 5;
  }

  _dispatchEvent(eventName, eventValue) {
    this.dispatchEvent(
      new CustomEvent(eventName, {
        detail: {value: eventValue},
        bubbles: true,
        composed: true
      })
    );
  }
}
