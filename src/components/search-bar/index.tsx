import React from 'react';
import Paper from '@material-ui/core/Paper';
import InputBase, {InputBaseProps} from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';

export type ISearchBarProps = {
  onChange: InputBaseProps['onChange']
}

export default function SearchBar(props: ISearchBarProps) {
  return (
    <Paper className='py-2 px-3 flex justify-between'>
      <InputBase
        className='flex-1'
        placeholder="Search"
        inputProps={{ 'aria-label': 'search google maps' }}
        onChange={props.onChange}
      />
      <IconButton type="submit" className='p-2.5' aria-label="search">
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}