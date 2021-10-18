import {LitElement, html, property} from 'lit-element';
import '@polymer/iron-flex-layout/iron-flex-layout.js';

/**
 * `etools-data-table-header`
 * @LitElement
 * @customElement
 * @extends {LitElement}
 * @demo demo/index.html
 */
class EtoolsDataTableHeader extends LitElement {
  render() {
    // language=HTML
    return html`
      <style>
        :host {
          display: block;
          border-bottom: 1px solid var(--list-divider-color, #9d9d9d);
        }

        div#header-wrapper {
          padding: 0 24px;
          height: var(--list-header-wrapper-height, 118px);
          background-color: var(--list-bg-color, #ffffff);
        }

        :host([no-title]) div#header-wrapper {
          height: auto;
        }

        #title {
          width: 100%;
          height: 64px;
          line-height: 64px;
          font-size: 20px;
          color: var(--list-text-color, #2b2b2b);
        }

        :host([no-title]) #title {
          display: none;
        }

        #columns {
          @apply --layout-horizontal;
          @apply --layout-center;
          margin-inline-start: 32px;
          height: var(--list-header-wrapper-column-height, 56px);
        }

        :host([no-collapse]) #columns {
          margin-left: 0;
          flex: 1;
        }

        /* Mobile view CSS */
        :host([medium-resolution-layout]) div#header-wrapper,
        :host([low-resolution-layout]) div#header-wrapper {
          height: auto;
          padding: 0;
        }

        :host([medium-resolution-layout]) #columns,
        :host([low-resolution-layout]) #columns {
          display: none;
        }
      </style>

      <div id="header-wrapper" part="data-table-header">
        <div id="title" part="header-title">
          <span>${this.label}</span>
        </div>

        <div id="columns" part="header-columns">
          <slot></slot>
        </div>
      </div>
    `;
  }

  static get is() {
    return 'etools-data-table-header';
  }

  _sortOrder;

  set sortOrder(sortOrder) {
    this._sortOrder = sortOrder;
    this._sortOrderChanged(this._sortOrder);
  }

  get sortOrder() {
    return this._sortOrder;
  }

  static get properties() {
    return {
      sortOrder: {
        type: Object
      },
      _lastSelectedCol: {
        type: Object
      },
      noTitle: {
        type: Boolean,
        reflect: true
      },
      noCollapse: {
        type: Boolean,
        reflect: true
      },
      label: {
        type: String
      },
      lowResolutionLayout: {
        type: Boolean,
        value: false,
        reflect: true
      },
      mediumResolutionLayout: {
        type: Boolean,
        value: false,
        reflect: true
      }
    };
  }

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('sort-changed', this._handleSortChanged);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('sort-changed', this._handleSortChanged);
  }

  _handleSortChanged(e) {
    let column = e.target;
    this._clearSelected(column);
    // this.set('sortOrder.field', e.detail.field);
    // this.set('sortOrder.direction', e.detail.field);
    debugger;
    this.sortOrder = {...this.sortOrder, field: e.detail.field, direction: e.detail.field};
  }

  _sortOrderChanged(sortOrder) {
    debugger;
    let column = this.queryEffectiveChildren('*[field="' + sortOrder.field + '"]');
    this._clearSelected(column);
    //@dci
    column.selected = true;
    column.direction = sortOrder.direction;
  }

  _clearSelected(column) {
    if (this._lastSelectedCol && this._lastSelectedCol !== column) {
      //@dci this._lastSelectedCol.set('selected', null);
      this._lastSelectedCol = {...this._lastSelectedCol, selected: null};
    }
    this._lastSelectedCol = column;
  }
}
