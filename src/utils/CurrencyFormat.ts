// src/utils/CurrencyFormat.ts
export const formatCurrency = (
  value: any,
  locale: string = "en-NG", // Set the locale to Nigeria
  currency: string = "NGN"
): string => {
  return new Intl.NumberFormat(locale, { style: "currency", currency }).format(
    value
  );
};
