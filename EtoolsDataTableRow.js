import {LitElement, html} from 'lit-element';
import '@polymer/iron-icons/iron-icons.js';
import '@polymer/iron-collapse/iron-collapse.js';

/**
 * `etools-data-table-row`
 * @LitElement
 * @customElement
 * @extends {LitElement}
 * @demo demo/index.html
 */
export class EtoolsDataTableRow extends LitElement {
  render() {
    // language=HTML
    return html`
      <style>
        *[hidden] {
          display: none !important;
        }

        :host {
          --row-width: {
            width: calc(100% - 96px);
          }
          display: block;
        }

        :host([no-collapse]) div#wrapper:hover {
          background: var(--list-bg-color, #ffffff);
        }

        :host([secondary-bg-on-hover]) div#wrapper:hover {
          background-color: var(--list-second-bg-color, #eeeeee);
          /*@apply --hover-setting;*/
          /* the above mixin is replaced by etools-data-table-row::part(edt-list-row-wrapper):hover */
        }

        div#wrapper,
        #collapse-wrapper {
          border-bottom: 1px solid var(--list-divider-color, #9d9d9d);
        }

        div#wrapper:hover {
          background-color: var(--list-second-bg-color, #eeeeee);
          /*@apply --hover-setting;*/
          /* the above mixin is replaced by etools-data-table-row::part(edt-list-row-wrapper):hover */
        }

        div#wrapper {
          @apply --layout-horizontal;
          @apply --layout-center;
          padding: var(--list-row-wrapper-padding, 0 24px 0 0);
          font-size: 13px;
          color: var(--list-text-color, #2b2b2b);
          background-color: var(--list-bg-color, #ffffff);
        }

        :host div#wrapper ::slotted([slot='row-data']) {
          text-overflow: ellipsis;
          @apply --row-width;
        }

        :host([no-collapse]) div#wrapper ::slotted([slot='row-data']) {
          width: 100%;
        }

        :host([no-collapse]) div#wrapper ::slotted([slot='row-data']) {
          width: 100%;
        }

        div#wrapper,
        #collapse-wrapper {
          border-bottom: 1px solid var(--list-divider-color, #9d9d9d);
        }

        #iconWrapper {
          min-height: 48px;
          line-height: 48px;
          padding: 0 16px;
          cursor: pointer;
          width: 24px;
        }

        iron-icon:focus {
          outline: 0;
          background-color: rgba(170, 165, 165, 0.3);
          border-radius: 50%;
        }

        iron-icon {
          color: var(--list-icon-color, #2b2b2b);
        }

        iron-icon:hover {
          color: var(--list-icon-hover-color, rgba(0, 0, 0, 0.87));
        }

        #collapse-wrapper {
          padding: 16px 24px 16px 58px;
          background-color: var(--list-second-bg-color, #eeeeee);
        }

        :host([no-collapse]) #details,
        :host([no-collapse]) #iconWrapper {
          display: none;
        }

        :host([no-collapse]) #wrapper {
          padding: var(--list-row-wrapper-padding, 0 24px);
          @apply --list-row-no-collapse;
        }

        /* Mobile view CSS */
        :host([medium-resolution-layout]) div#wrapper,
        :host([low-resolution-layout]) div#wrapper {
          padding-right: 0;
        }

        :host([medium-resolution-layout]) #iconWrapper,
        :host([low-resolution-layout]) #iconWrapper {
          min-height: 0;
          line-height: normal;
          padding: 8px;
        }

        :host([medium-resolution-layout]) #collapse-wrapper,
        :host([low-resolution-layout]) #collapse-wrapper {
          padding: 0 0 0 40px;
        }
      </style>

      <div id="wrapper" part="edt-list-row-wrapper">
        <div id="iconWrapper" part="edt-icon-wrapper">
          <iron-icon
            id="more"
            icon="expand-more"
            ?hidden="${this.detailsOpened}"
            @keyup="${(e) => this._callClickOnSpace(e)}"
            @tap="${() => this._toggleRowDetails()}"
            tabindex="0"
          >
          </iron-icon>
          <iron-icon
            id="less"
            icon="expand-less"
            ?hidden="${!this.detailsOpened}"
            @keyup="${(e) => this._callClickOnSpace(e)}"
            @tap="${() => this._toggleRowDetails()}"
            tabindex="0"
          >
          </iron-icon>
        </div>
        <slot name="row-data"></slot>
      </div>

      <iron-collapse id="details" ?opened="${this.detailsOpened}" no-animation="${this.noAnimation}">
        <div id="collapse-wrapper" part="edt-list-row-collapse-wrapper">
          <slot name="row-data-details"></slot>
        </div>
      </iron-collapse>
    `;
  }

  static get is() {
    return 'etools-data-table-row';
  }

  static get properties() {
    return {
      detailsOpened: {
        type: Boolean,
        value: false
      },
      noCollapse: {
        type: Boolean,
        reflect: true
      },
      noAnimation: {
        type: Boolean,
        value: false
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

  _toggleRowDetails() {
    this.detailsOpened ? (this.detailsOpened = false) : (this.detailsOpened = true);
  }

  _callClickOnSpace(event) {
    if (event.key === ' ' && !event.ctrlKey) {
      // Cancel the default action, if needed
      event.preventDefault();
      // Trigger the button element with a click
      event.target.click();
      event.target.focus();
    }
  }
}
