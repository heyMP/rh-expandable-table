import { ReactiveController, ReactiveElement } from 'lit';
import styles from './styles.css?raw';

function convertToCssStylesheet(css: string): CSSStyleSheet {
  const styles = new CSSStyleSheet();
  styles.replace(css);
  return styles;
}

export class ExpandableTableController implements ReactiveController {
  #expandableRows: any;

  constructor(public host: ReactiveElement) {
    host.addController(this);
  }

  hostUpdated() {
    // only init on initial render
    if (this.host.hasUpdated) return;
    this.init();
  }

  async init() {
    if (!this.host.shadowRoot) return;
    this.attachExpandableRow();
    // attach shadowRoot styles
    this.host.shadowRoot.adoptedStyleSheets = [...this.host.shadowRoot.adoptedStyleSheets, convertToCssStylesheet(styles)];
  }

  expandRows(row: HTMLElement) {
    const detailsRow = row.nextElementSibling || undefined;
    const pfIconTableHeader = row.querySelector('th > pf-icon');
    if (!detailsRow) return;

    row.setAttribute(
      'aria-expanded',
      row.getAttribute('aria-expanded') === 'false' ? 'true' : 'false'
    );
    if (detailsRow.getAttribute('hidden')) {
      detailsRow.removeAttribute('hidden');
      pfIconTableHeader?.setAttribute('icon', 'caret-down');
    } else {
      detailsRow.toggleAttribute('hidden');
      pfIconTableHeader?.setAttribute('icon', 'caret-right');
    }
  }

  attachExpandableRow() {
    this.unAttachExpandableRow();
    this.#expandableRows =
      // @ts-ignore
      this.host.shadowRoot.querySelectorAll('tr[aria-expanded]');
    this.#expandableRows.forEach((row: any) => {
      row.addEventListener('click', () => {
        this.expandRows(row);
      });
      row.addEventListener('keydown', (event: KeyboardEvent) => {
        if (
          event.key === 'Enter' ||
          event.key === ' ' ||
          event.key === 'Spacebar' ||
          event.key === 'ArrowDown' ||
          event.key === 'ArrowUp'
        ) {
          event.preventDefault();
          this.expandRows(row);
        }
      });
    });
  }

  unAttachExpandableRow() {
    this.#expandableRows?.forEach((row: any) => {
      row.removeEventListener('click', () => {
        this.expandRows(row);
      });
    });
  }

  hostConnected() {
  }

  hostDisconnected() {
  }
}
