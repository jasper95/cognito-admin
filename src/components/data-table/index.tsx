import React, { Dispatch } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Paper from '@material-ui/core/Paper';
import { Identifiable, ColumnSort, ColumnType } from './types';
import Column, { StyledTableCell } from './column';
import { TableState, TableAction } from './table-reducer';
import get from 'lodash/get';
import StyledTableRow from './table-row'

import TablePreloader from './pre-loader';
import { Typography } from '@material-ui/core';

type DataTableProps<T extends Identifiable> = {
  rows: T[];
  columns: ColumnType<T>[];
  onRowClick: (row: T) => void;
  className: string;
  isSelectable: boolean;
  onSort: (column: string) => void;
  sort: ColumnSort[];
  onRowToggle: () => void;
  pageSizes: number[];
  showPagination?: boolean;
  tableState?: TableState;
  tableDispatch?: Dispatch<TableAction<T>>;
  loading?: boolean;
  rowClassName?: (row: T) => string;
  checkedItems?: string[];
  rowCheckboxEnabled?: (row: T) => boolean;
  stickyHeader?: boolean;
};


function DataTable<T extends Identifiable>(props: DataTableProps<T>) {
  const {
    rows,
    columns,
    onRowClick,
    className,
    isSelectable,
    showPagination,
    tableState,
    tableDispatch,
    pageSizes,
    loading,
    rowClassName = () => '',
    checkedItems,
    rowCheckboxEnabled = () => true,
    stickyHeader,
  } = props;
  const sort = get(tableState, 'sort', []);
  const additionalColumns: ColumnType<T>[] = [];
  const isEmpty = !loading && rows.length === 0;
  return (
    <TableContainer component={Paper}>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            {columns.concat(additionalColumns).map(({ title, accessor = '', headProps = {}, sortable = true }, idx) => {
              const sorted = sortable ? sort.find((e) => e.column === accessor) : undefined;
              return (
                <TableCell sortDirection={sorted?.direction ?? false} key={idx}>
                  <TableSortLabel
                    hideSortIcon={!sortable}
                    active={Boolean(sorted)}
                    direction={sorted?.direction}
                    onClick={() => {
                      if (tableDispatch && sortable) {
                        const payload: ColumnSort = {
                          column: `${accessor}`,
                          direction: !sorted || get(sorted, 'direction') === 'desc' ? 'asc' : 'desc',
                        };
                        tableDispatch({ type: 'SetSort', payload });
                      }
                    }}
                  >
                    {title}
                  </TableSortLabel>
                </TableCell>
              );
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {isEmpty && (
            <StyledTableRow>
              <StyledTableCell colSpan={columns.length}>
                <Typography variant='subtitle2' align='center'>
                  No records found
                </Typography>
              </StyledTableCell>
            </StyledTableRow>
          )}
          {loading && <TablePreloader rows={tableState?.size ?? 10} columns={columns.length}/>}
          {rows.map((row, rowIndex) => (
            <StyledTableRow
              selected={checkedItems?.includes(row.id)}
              key={row.id}
              onClick={(e) => {
                e.stopPropagation();
                onRowClick(row);
              }}
              className={rowClassName(row)}
            >
              {columns.concat(additionalColumns).map((column, idx) => (
                <Column index={rowIndex} key={idx} column={column} row={row} />
              ))}
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
      {showPagination && tableState && tableDispatch && (
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={tableState.total}
          rowsPerPage={tableState?.size}
          page={tableState?.page}
          onPageChange={(_, payload) => tableDispatch({ type: 'SetPage', payload })}
          onRowsPerPageChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            tableDispatch({ type: 'SetSize', payload: Number(event.target.value) })
          }
        />
      )}
    </TableContainer>
  );

  // function handleCheck(val: boolean, event: React.ChangeEvent<HTMLInputElement>) {
  //   event.stopPropagation();
  //   const { id } = event.target;
  //   const index = rows.findIndex((e) => e.id === id);
  //   onRowToggle(index + 1, val);
  // }

  function onRowToggle(index: number, checked: boolean) {
    tableDispatch && tableDispatch({ type: 'SetSelected', payload: { index, checked, rows } });
  }
}

DataTable.defaultProps = {
  className: '',
  onRowClick: () => {},
  onRowToggle: () => {},
  // selected: [],
  isSelectable: false,
  onSort: () => {},
  sort: [],
  checkedItems: [],
  pageSizes: [10, 50, 100, 250],
};

export default DataTable;
