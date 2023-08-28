import { createContext, useState } from "react";
// custom types
import {
  IToastContext,
  IToastProvider,
  IToastState,
} from "@common/types/toast";

const initState: IToastState = { isToastOpen: false, toastMessage: "" };

export const ToastContext = createContext<IToastContext | undefined>(undefined);

export const ToastProvider = ({ children }: IToastProvider) => {
  const [toastState, setToastState] = useState(initState);

  return (
    <ToastContext.Provider value={{ toastState, setToastState }}>
      {children}
    </ToastContext.Provider>
  );
};
