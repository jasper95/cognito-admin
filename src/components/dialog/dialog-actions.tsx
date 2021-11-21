import React from 'react';
import MuiDialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';

export type DialogActionsProps = {
  onContinue(): void;
  onCancel(): void;
  isProcessing?: boolean;
  continueLabel?: string;
  cancelLabel?: string;
};

export default function DialogActions(props: DialogActionsProps) {
  const { onCancel, onContinue, continueLabel = 'Continue', cancelLabel = 'Cancel', isProcessing } = props;
  return (
    <MuiDialogActions>
      <Button onClick={onCancel} color="primary">
        {cancelLabel}
      </Button>
      <Button disabled={isProcessing} onClick={onContinue} color="primary" autoFocus>
        {isProcessing && (
          <Box pr={1} display="flex" alignItems="center">
            <CircularProgress size={25} />
          </Box>
        )}
        {continueLabel}
      </Button>
    </MuiDialogActions>
  );
}
