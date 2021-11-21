import React, { ComponentType, ReactElement, ReactNode } from 'react';
import create from 'zustand';

export type IDialog<T> = {
  component: ComponentType<T>;
  props: T;
};

type IDialogStore<T = any> = {
  dialog: IDialog<T> | null;
  showDialog<T>(dialog: { component: ComponentType<T>; props: T }): void;
  hideDialog(): void;
  toggleDialogLoading(): void;
};

export const useDialogStore = create<IDialogStore>((set) => ({
  dialog: null,
  showDialog: (dialog) => set(() => ({ dialog: dialog })),
  toggleDialogLoading: () =>
    set((state) => {
      if (state.dialog) {
        return {
          ...state,
          dialog: {
            ...state.dialog,
            props: {
              ...state.dialog?.props,
              isProcessing: !Boolean(state.dialog?.props?.isProcessing),
            },
          },
        };
      }
      return state;
    }),
  hideDialog: () => set(() => ({ dialog: null })),
}));
