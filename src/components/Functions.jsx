import { format } from "date-fns";
import { parseISO } from "date-fns";
import en from "date-fns/locale/en-US";


export const dateFormat = (dateValue) => {
  const parsedDate = parseISO(dateValue);
  const formattedDate = format(parsedDate, "d  MMMM  EEE", {
    locale: en,
  });
  return formattedDate;
};

export const dateLongFormat = (date) => {
  const parsedDate = parseISO(date);
  const formattedDate = format(parsedDate, "d  MMMM  EEEE yyyy", {
    locale: en,
  });
  return formattedDate;
};
export const formatPrice = (value) => {
  const price = new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency: "TRY",
  }).format(value);
  return price;
};

export const backToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};
