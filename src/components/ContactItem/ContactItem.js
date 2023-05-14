import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import { deleteContact } from 'redux/constats/contactsThunk';
import { Button, ListItem, ListItemText } from '@mui/material';

export const ContactItem = ({ name, id, phone }) => {
  const dispatch = useDispatch();

  return (
    <ListItem sx={{ borderBottom: '1px solid grey' }}>
      <ListItemText
        inset
        primary={`name: ${name}`}
        secondary={`phone: ${phone}`}
      />
      <Button
        type="button"
        onClick={() => dispatch(deleteContact(id))}
        children="Delete"
        variant="outlined"
        size="small"
      />
    </ListItem>
  );
};

ContactItem.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
};
