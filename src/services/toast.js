import { toast } from "@zerodevx/svelte-toast";

const success = (message) => {
  toast.push(message, {
    theme: {
      "--toastBackground": "#48BB78",
      "--toastBarBackground": "#2F855A",
    },
    pausable: true,
  });
};

const error = (message) => {
  toast.push(message, {
    theme: {
      "--toastBackground": "#F56565",
      "--toastBarBackground": "#C53030",
    },
    pausable: true,
  });
};

export default {
  success,
  error,
};
