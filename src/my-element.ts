import { LitElement, PropertyValues, html } from 'lit'
import { customElement } from 'lit/decorators.js'
import '@rhds/elements/rh-table/rh-table.js';
import RhTableLightDomStyles from '@rhds/elements/rh-table/rh-table-lightdom.css?raw';
import styles from './my-element.css?raw';
import { ExpandableTableController } from './lib/ExpandableTableController.js';

const RhTableLightDomStylesheet = new CSSStyleSheet();
RhTableLightDomStylesheet.replace(RhTableLightDomStyles);

const MyElementStylesheet = new CSSStyleSheet();
MyElementStylesheet.replace(styles);

/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
@customElement('my-element')
export class MyElement extends LitElement {

  static styles = [RhTableLightDomStylesheet, MyElementStylesheet];

  expandableTableController = new ExpandableTableController(this);

  protected firstUpdated(_changedProperties: PropertyValues): void {
    setInterval(() => {
      this.requestUpdate();
    }, 1000);
  }

  render() {
    return html`
      <rh-table>
        <table>
          <caption>
            Concerts
          </caption>
          <colgroup>
            <col>
            <col>
            <col>
          </colgroup>
          <thead>
            <tr>
              <th id="concerts-date" scope="col" data-label="Date">Date</th>
              <th id="concerts-event" scope="col" data-label="Event">Event<rh-sort-button></rh-sort-button></th>
              <th id="concerts-venue" scope="col" data-label="Venue">Venue<rh-sort-button></rh-sort-button></th>
            </tr>
          </thead>
          <tbody>
            <tr tabindex="0" aria-expanded="true" aria-controls="sub-panel">
              <td headers="concerts-date" data-label="Date">12 February</td>
              <td headers="concerts-event" data-label="Event">Waltz with Strauss</td>
              <td headers="concerts-venue" data-label="Venue">Main Hall</td>
            </tr>
            <tr id="sub-panel" expandable>
              <td colspan="3">
                <div panel>
                  <div panel-container>
                    <div>ugh</div>
                    <div>ugh</div>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td headers="concerts-date" data-label="Date">12 February</td>
              <td headers="concerts-event" data-label="Event">Waltz with Strauss</td>
              <td headers="concerts-venue" data-label="Venue">Main Hall</td>
            </tr>
            <tr>
              <td headers="concerts-date" data-label="Date">24 March</td>
              <td headers="concerts-event" data-label="Event">The Obelisks</td>
              <td headers="concerts-venue" data-label="Venue">West Wing</td>
            </tr>
            <tr>
              <td headers="concerts-date" data-label="Date">14 April</td>
              <td headers="concerts-event" data-label="Event">The What</td>
              <td headers="concerts-venue" data-label="Venue">Main Hall</td>
            </tr>
          </tbody>
        </table>
        <small slot="summary">Dates and venues subject to change.</small>
      </rh-table>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'my-element': MyElement
  }
}
