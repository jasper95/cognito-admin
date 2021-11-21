import React from 'react';
import get from 'lodash/get';
import { RowProp } from './types';
import TableCell from '@material-ui/core/TableCell/TableCell';
import { createStyles, IconButton, Theme, Tooltip, withStyles } from '@material-ui/core';

export const StyledTableCell = withStyles((theme: Theme) =>
  createStyles({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }),
)(TableCell);
function Column<T>(props: RowProp<T>) {
  const { row, column, index } = props;
  const {
    type = 'default',
    accessor = '',
    bodyProps = {},
    actions = [],
    component: Cell = () => null,
    fn = () => null,
    componentProps = {},
    title,
  } = column;
  let children;
  if (type === 'actions') {
    children = (
      <div className='flex'>
        {actions.map(
          ({
            label,
            className,
            icon,
            onClick = () => {},
            type: actionType = 'button',
            component: Action = () => null,
            conditionalRendering = (arg) => true,
          }) => {
            if (!conditionalRendering(row)) {
              return <span key={label} className="column-no-action" />;
            }
            if (actionType === 'component') {
              return <Action key={label} row={row} label={label} icon={icon} onClick={onClick} />;
            }
            return (
              <Tooltip key={label} title={label}>
                <IconButton
                  className='p-2'
                  onClick={(e: any) => {
                    e.stopPropagation();
                    onClick(row);
                  }}
                  key={label}
                >
                  {icon}
                </IconButton>
              </Tooltip>
            );
          },
        )}
      </div>
    );
  } else if (type === 'component') {
    children = <Cell index={index} row={row} {...componentProps} />;
  } else if (type === 'function') {
    children = fn(row, index);
  } else {
    children = `${get(row, accessor)}`;
  }

  return (
    <StyledTableCell {...bodyProps}>
      {children}
      {/* <div className="tableCell" data-header-title={title}>
      </div> */}
    </StyledTableCell>
  );
}

export default Column;
