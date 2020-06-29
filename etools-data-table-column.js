import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';

import '@polymer/iron-icons/iron-icons.js';

/**
 * `etools-data-table-column`
 * @polymer
 * @customElement
 * @extends {PolymerElement}
 * @demo demo/index.html
 */
class EtoolsDataTableColumn extends PolymerElement {
  static get template() {
    // language=HTML
    return html`
      <style>
        :host {
          @apply --layout-horizontal;
          @apply --layout-center;

          height: var(--list-header-column-height, 56px);
          font-size: 12px;
          color: var(--list-secondary-text-color, #757575);
          font-weight: bold;
        }

        :host([sortable]) {
          cursor: pointer;
        }

        #label {
          margin-right: 5px;
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
          @apply --list-column-label;
        }

        #icon-wrapper,
        iron-icon {
          width: 16px;
          height: 16px;
        }

        #up,
        #down,
        #icon-wrapper {
          display: none;
        }

        :host(:not([selected]):hover[sortable]) #up {
          display: block;
        }

        :host([selected]) #label,
        :host(:not([selected]):hover[sortable]) #label {
          color: var(--list-text-color, rgba(0, 0, 0, 0.87));
        }

        :host([selected][direction='asc']) #up,
        :host([selected][direction='asc']) #icon-wrapper {
          display: block;
        }

        :host([selected][direction='desc']) #down,
        :host([selected][direction='desc']) #icon-wrapper {
          display: block;
        }

        :host(:not([selected])) iron-icon {
          color: var(--list-icon-hover-color, rgba(0, 0, 0, 0.38));
        }

        :host([selected]) iron-icon {
          color: var(--list-icon-color, rgba(0, 0, 0, 0.87));
        }
      </style>

      <span id="label">
        <slot></slot>
      </span>
      <div id="icon-wrapper">
        <iron-icon id="up" icon="arrow-upward"></iron-icon>
        <iron-icon id="down" icon="arrow-downward"></iron-icon>
      </div>
    `;
  }

  static get is() {
    return 'etools-data-table-column';
  }

  static get properties() {
    return {
      selected: {
        type: Boolean,
        value: false,
        reflectToAttribute: true
      },

      field: {
        type: String
      },

      direction: {
        type: String,
        reflectToAttribute: true
      }
    };
  }

  ready() {
    super.ready();
    this.addEventListener('tap', this._sort);
  }

  _sort() {
    if (!this.hasAttribute('sortable')) {
      return;
    }
    if (!this.selected || !this.direction) {
      this.set('selected', true);
      this.set('direction', 'asc');
    } else {
      this.set('direction', this.direction === 'asc' ? 'desc' : 'asc');
    }
    this.dispatchEvent(
      new CustomEvent('sort-changed', {
        detail: {field: this.field, direction: this.direction},
        bubbles: true,
        composed: true
      })
    );
  }
}

customElements.define(EtoolsDataTableColumn.is, EtoolsDataTableColumn);
