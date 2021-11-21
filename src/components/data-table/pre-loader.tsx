import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import Grid from '@material-ui/core/Grid';
import range from 'lodash/range';
import { getRandomInt } from '@/shared/utils/general';
import StyledTableRow from './table-row';
import { StyledTableCell } from './column';

type ITablePreloaderProps = {
  columns: number;
  rows: number
};
export default function TablePreloader(props: ITablePreloaderProps) {
  const { columns, rows } = props
  const child = React.useMemo(
      () => (
        <>
          {range(0, rows).map((row) => (
            <StyledTableRow key={row}>
              {range(0, columns).map(col => (
                <StyledTableCell key={col}>
                  <Skeleton variant="text" width={`${getRandomInt(80, 100)}%`} />
                </StyledTableCell>
              ))}
            </StyledTableRow>
          ))}
        </>
      ),
      [],
  );
  return child;
}