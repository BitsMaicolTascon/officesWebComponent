import { LitElement, html } from "lit";
import stylesScss from "./wcOffices.style.js";
import handleTemplate from "../helpers/handleTemplate.js";
import handleResponse from "../helpers/handleResponse.js";

export class Offices extends LitElement {
  static get properties() {
    return {
      isLoading: { type: "boolean", default: false },
      data: { type: Object },
    };
  }

  static get styles() {
    return [stylesScss];
  }

  constructor() {
    super();
    this.isLoading = false;
    this.data = [];
  }

  firstUpdated() {
    this.getOffices();
  }

  getOffices() {
    this.isLoading = true;
    handleResponse("http://localhost:3010/business/")
      .then((data) => {
        this.data = data?.business;
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setTimeout(() => {
          this.isLoading = false;
        }, 2000);
      });
  }

  loadingTemplate() {
    return html`<div class="loading-container">
      <div class="loading"></div>
    </div> `;
  }

  webComponentTemplate() {
    const image = `components/wcOffices/assets/images/edificio-de-oficinas.png`;
    return html`${this.data.map((item) => {
      return html`<div class="card">
        <div class="card-header">
          <h3>Información de oficinas</h3>
        </div>
        <div class="card-body">
          <p>código: ${item.code}</p>
          <p>Descripción: ${item.description}</p>
          <p>Dirección: ${item.address}</p>
          <p>Identificación: ${item.indentification}</p>
          <p>Moneda: ${item.currency}</p>
        </div>
        <div class="card-footer">
            <img class="img-card" src="${image}" />
        </div>
      </div>`;
    })}`;
  }

  render() {
    return html`<div>
      ${handleTemplate(
        this.isLoading,
        this.loadingTemplate(),
        this.webComponentTemplate()
      )}
    </div>`;
  }
}

customElements.define("wc-offices", Offices);
