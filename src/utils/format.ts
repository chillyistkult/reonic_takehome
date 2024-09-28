const locale = "en-US";

const format = (options?: Intl.NumberFormatOptions) => (value: number) => {
  return new Intl.NumberFormat(locale, {
    maximumSignificantDigits: 4,
    minimumSignificantDigits: 4,
    notation: "standard",
    ...options,
  }).format(value);
};

export const formatPercent = (
  value: number,
  options?: Intl.NumberFormatOptions,
) =>
  format({
    maximumFractionDigits: 1,
    minimumFractionDigits: 1,
    style: "percent",
    ...options,
  })(value);

export const formatInteger = (
  number: number,
  options?: Intl.NumberFormatOptions,
) =>
  format({
    maximumFractionDigits: 0,
    ...options,
  })(number);

export const formatCurrency = (
  number: number,
  options?: Intl.NumberFormatOptions,
) =>
  format({
    currency: "USD",
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
    style: "currency",
    ...options,
  })(number);

export const formatDollar = formatCurrency;
