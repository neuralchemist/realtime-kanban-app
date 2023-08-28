
export interface IToastProvider {
  children: React.ReactNode;
}

export interface IToastState {
  isToastOpen: boolean;
  toastMessage: string;
}

export interface IToastContext {
  toastState: IToastState;
  setToastState: React.Dispatch<React.SetStateAction<IToastState>>;
}