import { Theme } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import TableRow from '@material-ui/core/TableRow';

const StyledTableRow = withStyles((theme: Theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

export default StyledTableRow