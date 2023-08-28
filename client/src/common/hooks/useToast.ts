import { useContext } from "react";
// custom types
import { IToastContext } from "@common/types/toast";
import { ToastContext } from "@common/context";

export const useToast = (): IToastContext => {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error("useToastContext must be used within a ToastProvider");
  }

  return context;
};
