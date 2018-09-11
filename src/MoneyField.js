// @flow
import React, { PureComponent } from "react";

type Props = {
  +context: *,
  +field: any,
  +form: any,
  +name: string
};

type State = {
  formattedValue: string,
  cents: number
};

const isValuePresent = value =>
  value !== undefined && value !== null && value !== "";

class MoneyField extends PureComponent<Props, State> {
  state = {
    formattedValue: "",
    cents: null
  };

  inputRef = React.createRef();

  // Reload on context change
  componentDidUpdate({ context: newContext, field: { value } }) {
    const { context: oldContext } = this.props;
    const curencyHasChanged = oldContext.currency !== newContext.currency;
    const localeHasChanged = oldContext.locale !== newContext.locale;

    if (curencyHasChanged || localeHasChanged) {
      this.setInternalInputValueFromCents(value);
    }
  }

  componentDidMount() {
    const {
      field: { value }
    } = this.props;

    this.setInternalInputValueFromCents(value);
  }

  setInternalInputValueFromCents = cents => {
    if (isValuePresent(cents)) {
      const formattedValue = this.formatCents(cents);
      this.updateInternalInputValue(formattedValue);
      this.setState({ formattedValue, cents: cents });
    }
  };

  formatCents = value => this.formatLocaleCurrencyNumber(value / 100);

  parseCents = value => Math.round(this.parseLocaleCurrencyNumber(value) * 100);

  formatLocaleCurrencyNumber = value => {
    const {
      context: { currency, locale }
    } = this.props;

    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency
    }).format(value);
  };

  parseLocaleCurrencyNumber = stringNumber => {
    const {
      context: { currency, locale }
    } = this.props;

    // Find the currency symbol by testing how 1 whill be displayed;
    const numberWithCurrency = new Intl.NumberFormat(locale, {
      style: "currency",
      currency
    }).format(1);
    const currencySymbol = numberWithCurrency.replace(/1\.00/, "").trim();

    const thousandSeparator = (1111).toLocaleString(locale).replace(/1/g, "");
    const decimalSeparator = (1.1).toLocaleString(locale).replace(/1/g, "");

    return parseFloat(
      stringNumber
        .replace(currencySymbol, "")
        .replace(new RegExp(`\\ `, "g"), "")
        .replace(new RegExp(`\\${thousandSeparator}`, "g"), "")
        .replace(new RegExp(`\\${decimalSeparator}`), ".")
    );
  };

  updateFieldValue = cents => {
    const {
      form: { setFieldTouched, setFieldValue },
      field: { name }
    } = this.props;

    setFieldTouched(name, true);
    setFieldValue(name, cents);

    this.setState({ cents });
  };

  updateFormattedValue = formattedValue => this.setState({ formattedValue });

  updateInternalInputValue = InternalinputValue =>
    (this.inputRef.current.value = InternalinputValue);

  handleInputChange = () => {
    const InternalinputValue = this.inputRef.current.value;

    if (!isValuePresent(InternalinputValue)) {
      this.updateFieldValue(null);
      this.updateFormattedValue("");
    } else {
      const cents = this.parseCents(InternalinputValue);
      const formattedValue = this.formatCents(cents);

      this.updateFieldValue(cents);
      this.updateFormattedValue(formattedValue);
    }
  };

  handleInputBlur = () => {
    const { formattedValue } = this.state;
    this.updateInternalInputValue(formattedValue);
  };

  render() {
    return (
      <input
        onChange={this.handleInputChange}
        onBlur={this.handleInputBlur}
        ref={this.inputRef}
      />
    );
  }
}

export default MoneyField;
