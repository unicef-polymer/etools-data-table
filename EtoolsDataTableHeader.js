import {LitElement, html} from 'lit-element';

/**
 * `etools-data-table-header`
 * @LitElement
 * @customElement
 * @extends {LitElement}
 * @demo demo/index.html
 */
export class EtoolsDataTableHeader extends LitElement {
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
          display: flex;
          flex-direction: row;
          justify-content: center;
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

      <div id="header-wrapper" part="edt-data-table-header">
        <div id="title" part="edt-header-title">
          <span>${this.label}</span>
        </div>

        <div id="columns" part="edt-header-columns">
          <slot></slot>
        </div>
      </div>
    `;
  }

  static get is() {
    return 'etools-data-table-header';
  }

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
        reflect: true
      },
      mediumResolutionLayout: {
        type: Boolean,
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
    const column = e.target;
    this._clearSelected(column);
    this.sortOrder = {...this.sortOrder, field: e.detail.field, direction: e.detail.direction};
  }

  _sortOrderChanged(sortOrder) {
    const column = this.querySelector('*[field="' + sortOrder.field + '"]');
    this._clearSelected(column);
    column.selected = true;
    column.direction = sortOrder.direction;
  }

  _clearSelected(column) {
    if (this._lastSelectedCol && this._lastSelectedCol !== column) {
      this._lastSelectedCol = {...this._lastSelectedCol, selected: null};
    }
    this._lastSelectedCol = column;
  }
}
