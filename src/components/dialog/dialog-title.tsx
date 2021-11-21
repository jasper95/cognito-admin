import React from 'react';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles } from '@material-ui/core';

export type DialogTitleProps = {
  onCancel(): void;
  title: React.ReactNode;
};

const useStyles = makeStyles((theme) => ({
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
}));

export default function DialogTitle(props: DialogTitleProps) {
  const { onCancel, title } = props;
  const classes = useStyles();
  return (
    <MuiDialogTitle>
      <Typography variant="h6">{title}</Typography>
      {onCancel ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onCancel}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
}
