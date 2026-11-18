const euro = new Intl.NumberFormat("fr-FR", {
  style: "currency",
  currency: "EUR",
});

/** 19.9 -> "19,90 €" */
export const formatPrice = (value: number) => euro.format(value);
