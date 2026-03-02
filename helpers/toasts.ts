import { toast } from "sonner";

function toastWarning(message: string) {
  toast(message, {
    style: {
      background: "#FFFBEB",
      color: "#92400E",
      border: "1px solid #FDE68A",
      borderLeft: "5px solid #F59E0B",
      boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)",
    },
  });
}

function toastError(message: string) {
  toast(message, {
    style: {
      background: "#FEF2F2",
      color: "#991B1B",
      border: "1px solid #FECACA",
      borderLeft: "5px solid #EF4444",
      boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)",
    },
  });
}

export { toastWarning, toastError };
