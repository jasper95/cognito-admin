import DialogLayout, { DialogLayoutProps } from '@/components/dialog/dialog-layout';
import { useDialogStore } from '@/shared/stores/dialog';
import { useFormik, FormikProps, FormikConfig } from 'formik';
import React from 'react';
import pick from 'lodash/pick';

export type IDialogForm<T> = {
  initialValues?: T;
  validationSchema?: any;
  onCancel?(): void;
  onContinue?(): void;
  onValid?: FormikConfig<T>['onSubmit'];
};
export type IWithDialogProps<T> = Omit<DialogLayoutProps, 'onCancel' | 'onContinue' | 'children'> & IDialogForm<T>;

export type IDialogContentProps<T> = {
  formProps: FormikProps<T>;
};

function withDialog<T>(WrappedComponent: React.FC<IDialogContentProps<T>>) {
  const Dialog: React.FC<IWithDialogProps<T>> = (props) => {
    const { hideDialog } = useDialogStore();
    const { title, onContinue, onCancel, initialValues = {} as T, validationSchema, onValid } = props;
    const formProps: FormikProps<T> = useFormik<T>({
      validationSchema,
      initialValues,
      onSubmit: (data, helpers) => {
        onValid?.(data, helpers);
      },
    });
    return (
      <DialogLayout
        {...pick(props, 'isProcessing')}
        title={title}
        onCancel={onClickCancel ?? onCancel}
        onContinue={onContinue ?? onClickContinue}
      >
        <WrappedComponent formProps={formProps} />
      </DialogLayout>
    );

    function onClickCancel() {
      hideDialog();
    }

    function onClickContinue() {
      formProps.handleSubmit();
    }
  };
  return Dialog;
}

export default withDialog;
