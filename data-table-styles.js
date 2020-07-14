import '@polymer/polymer/polymer-element.js';
import '@polymer/iron-flex-layout/iron-flex-layout.js';
import {commonStyles} from './data-table-styles-common';

// todo: please note that changes also have to be made in data-table-styles-new-format
const $_documentContainer = document.createElement('template');
$_documentContainer.setAttribute('style', 'display: none;');
// languae=HTML
$_documentContainer.innerHTML = `<dom-module id="data-table-styles">
  <template>
    ${commonStyles}
  </template>
</dom-module>`;

document.head.appendChild($_documentContainer.content);
