import { ReactNode } from 'react';

export type ColumnSort = {
  column: string;
  direction: 'asc' | 'desc';
};

export type Identifiable = {
  id: string;
};

export type ColumnType<T = any> = {
  title?: string;
  accessor?: keyof T;
  type?: 'function' | 'actions' | 'component' | 'value';
  headProps?: object;
  component?: React.FC<any>;
  componentProps?: object;
  bodyProps?: object;
  fn?: (row: T, index: number) => React.ReactNode;
  actions?: ActionType<T>[];
  sortable?: boolean;
};

type ActionType<T> = {
  label: string;
  className?: string;
  icon?: string | ReactNode;
  onClick?: (row: T) => void;
  type?: 'button' | 'component';
  conditionalRendering?: (arg: T) => boolean;
  component?: React.FC<Pick<ActionType<T>, 'icon' | 'label' | 'onClick'> & { row: T }>;
};

export type RowProp<T> = {
  row: T;
  index: number;
  column: ColumnType<T>;
};
