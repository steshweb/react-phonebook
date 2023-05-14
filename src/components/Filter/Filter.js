import { useDispatch, useSelector } from 'react-redux';

import { getFilterAction } from 'redux/filter/filterSlice';
import { selectFilter } from 'redux/filter/filterSelectors';
import { Box, TextField } from '@mui/material';

export const Filter = () => {
  const filter = useSelector(selectFilter);
  const dispatch = useDispatch();

  const handleChangeFilter = e => {
    dispatch(getFilterAction(e.target.value));
  };
  return (
    <Box
      component="div"
      sx={{ width: '400px', mr: 'auto', ml: 'auto', mb: '30px' }}
    >
      <TextField
        value={filter}
        name="filter"
        onChange={handleChangeFilter}
        size="small"
        label="Find contacts by name"
        style={{ width: '100%' }}
      />
    </Box>
  );
};
