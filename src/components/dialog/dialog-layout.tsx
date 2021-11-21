import React from 'react';
import DefaultTitle, { DialogTitleProps } from './dialog-title';
import DefaultActions, { DialogActionsProps } from './dialog-actions';
import Dialog from '@material-ui/core/Dialog';
import pick from 'lodash/pick';
import DialogContent from '@material-ui/core/DialogContent';

export type DialogLayoutProps = DialogTitleProps &
  DialogActionsProps & {
    titleRenderer?: React.FunctionComponent<DialogTitleProps>;
    actionsRenderer?: React.FunctionComponent<DialogActionsProps>;
    children: React.ReactNode;
  };

export default function DialogLayout(props: DialogLayoutProps) {
  const {
    titleRenderer: DialogTitle = DefaultTitle,
    onCancel,
    actionsRenderer: DialogActions = DefaultActions,
    children,
  } = props;
  return (
    <Dialog fullWidth open onClose={onCancel}>
      <DialogTitle {...pick(props, ['onCancel', 'title'])} />
      <DialogContent>{children}</DialogContent>
      <DialogActions {...pick(props, ['onContinue', 'onCancel', 'isProcessing', 'continueLabel', 'cancelLabel'])} />
    </Dialog>
  );
}
