import { toast } from "react-toastify";

export const formatCurrency = (amount) => {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
  }).format(amount);
};

export const customToast = (type, message = null) => {
  if (type === "Success") {
    toast.success(message ? message : "Success");
  } else {
    toast.error(message ? message : "Unknown error");
  }
};
