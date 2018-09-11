// @flow
import React, { Component, Fragment } from "react";
import { Field, Form, Formik } from "formik";

import MoneyField from "./MoneyField";

type Props = {};

type State = {
  currency: "EUR" | "GBP" | "USD",
  locale: "en" | "fr" | "de"
};

class FormExample extends Component<Props, State> {
  state = {
    currency: "EUR",
    locale: "fr"
  };

  setCurrency = currency => this.setState({ currency });

  setLocale = locale => this.setState({ locale });

  renderCurrencyButton = (currencyCode, currencySymbol) => (
    <button
      type="button"
      onClick={() => this.setCurrency(currencyCode)}
      className={this.state.currency === currencyCode && "active"}
    >
      {currencySymbol}
    </button>
  );

  renderLocaleButton = (locale, label) => (
    <button
      type="button"
      onClick={() => this.setLocale(locale)}
      className={this.state.locale === locale && "active"}
    >
      {label}
    </button>
  );

  renderContextParams = () => (
    <div>
      {this.renderLocaleButton("fr", "🇫🇷")}
      {this.renderLocaleButton("en", "🇺🇸")}
      {this.renderLocaleButton("de", "🇩🇪")}
      <br />
      {this.renderCurrencyButton("EUR", "€")}
      {this.renderCurrencyButton("USD", "$")}
      {this.renderCurrencyButton("GBP", "£")}
    </div>
  );

  render() {
    const { currency, locale } = this.state;

    return (
      <Formik
        initialValues={{ cents: 8123590 }}
        onSubmit={(values, actions) =>
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            actions.resetForm();
          })
        }
        render={props => (
          <Form>
            {this.renderContextParams()}

            <Field
              name="cents"
              component={MoneyField}
              context={{ currency, locale }}
            />

            <br />
            <button type="submit">Submit form</button>
            <br />
            <pre className="debug">
              /* Form props */
              <br />
              <br />
              {JSON.stringify(props, null, 2)}
            </pre>
          </Form>
        )}
      />
    );
  }
}

export default FormExample;
