import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-flex-layout/iron-flex-layout.js';

/**
 * `etools-data-table-header`
 * @polymer
 * @customElement
 * @demo demo/index.html
 */
class EtoolsDataTableHeader extends PolymerElement {
  static get template() {
    // language=HTML
    return html`
      <style>

        :host {
          display: block;
          border-bottom: 1px solid var(--list-divider-color, #9d9d9d);
        }

        div#header-wrapper {
          padding: 0 24px;
          height: 118px;
          background-color: var(--list-bg-color, #ffffff);
          @apply --data-table-header;
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
          @apply --header-title;
        }

        :host([no-title]) #title {
          display: none;
        }

        #columns {
          @apply --layout-horizontal;
          @apply --layout-center;
          margin-left: 32px;
          height: 56px;
          @apply --header-columns;
        }

        :host([no-collapse]) #columns {
          margin-left: 0;
          flex: 1
        }

        @media screen and (max-width: 767px) {
          div#header-wrapper {
            height: auto;
            padding: 0;
          }
          #columns {
            display: none;
          }
        }

      </style>

      <div id="header-wrapper">
        <div id="title">
          <span>[[label]]</span>
        </div>

        <div id="columns">
          <slot></slot>
        </div>

      </div>
    `;
  }

  static get is() {
    return 'etools-data-table-header';
  }

  static get properties() {
    return {
      sortOrder: {
        type: Object,
        observer: '_sortOrderChanged'
      },

      _lastSelectedCol: {
        type: Object
      },

      noTitle: {
        type: Boolean,
        reflectToAttribute: true
      },
      noCollapse: {
        type: Boolean,
        reflectToAttribute: true
      },
      label: {
        type: String
      }
    };
  }

  ready() {
    super.ready();
    this.addEventListener('sort-changed', this._handleSortChanged);
  }

  _handleSortChanged(e) {
    let column = e.target;
    this._clearSelected(column);
    this.set('sortOrder.field', e.detail.field);
    this.set('sortOrder.direction', e.detail.field);
  }

  _sortOrderChanged(sortOrder) {
    let column = this.queryEffectiveChildren('*[field="' + sortOrder.field + '"]');
    this._clearSelected(column);
    column.set('selected', true);
    column.set('direction', sortOrder.direction);
  }

  _clearSelected(column) {
    if (this._lastSelectedCol && this._lastSelectedCol !== column) {
      this._lastSelectedCol.set('selected', null);
    }
    this._lastSelectedCol = column;
  }
}

customElements.define(EtoolsDataTableHeader.is, EtoolsDataTableHeader);
