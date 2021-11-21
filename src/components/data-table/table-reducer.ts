import { ColumnSort, Identifiable } from './types';

export type TableState = {
  size: number;
  page: number;
  total: number;
  sort: ColumnSort[];
  selected: string[];
  search: string;
};

export const tableInitialState: TableState = {
  size: 10,
  page: 0,
  sort: [],
  selected: [],
  search: '',
  total: 0,
};

export type RowSelectionPayload<T extends Identifiable> = {
  index: number;
  checked: boolean;
  rows: T[];
};

export default function tableReducer<T extends Identifiable>(state: TableState, action: TableAction<T>): TableState {
  if (action.type === 'SetSearch') {
    return {
      ...tableInitialState,
      search: action.payload,
      sort: state.sort,
    };
  }
  if (action.type === 'ResetSelected') {
    return { ...state, selected: [] };
  } else if (action.type === 'SetSort') {
    return { ...state, sort: [action.payload] };
  }
  const keyMappings = {
    SetSize: 'size',
    SetPage: 'page',
    SetSelected: 'selected',
    SetTotal: 'total',
  };
  const key = keyMappings[action.type];
  if (action.type === 'SetSelected') {
    const { index, checked, rows } = action.payload;
    const { selected } = state;
    let arr = [];
    if (index === 0) {
      arr = checked ? rows.map((e) => e.id) : [];
    } else {
      const { id } = rows[index - 1] as T;
      arr = checked ? [...selected, id] : selected.filter((e) => e !== id);
    }
    return { ...state, [key]: arr };
  }
  return { ...state, [key]: action.payload };
}

export type TableAction<T extends Identifiable> =
  | { type: 'SetSize'; payload: number }
  | { type: 'SetPage'; payload: number }
  | { type: 'SetSort'; payload: ColumnSort }
  | { type: 'SetSelected'; payload: RowSelectionPayload<T> }
  | { type: 'ResetSelected' }
  | { type: 'SetSearch'; payload: string }
  | { type: 'SetTotal'; payload: number };
