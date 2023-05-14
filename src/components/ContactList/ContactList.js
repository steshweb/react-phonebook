import { ContactItem } from 'components/ContactItem/ContactItem';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchContacts } from 'redux/constats/contactsThunk';
import {
  selectContactError,
  selectContactIsLoading,
} from 'redux/constats/contactsSelectors';
import { selectFilteredContacts } from 'redux/filter/filterSelectors';
import { List, Typography } from '@mui/material';
import { Loader } from 'components/Loader/Loader';

export const ContactList = () => {
  const filteredContacts = useSelector(selectFilteredContacts);
  const contactsIsLoading = useSelector(selectContactIsLoading);
  const error = useSelector(selectContactError);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <>
      {contactsIsLoading && <Loader />}
      {error && (
        <Typography component="p" sx={{ color: 'red', m: '10' }}>
          The server is not responding
        </Typography>
      )}
      {filteredContacts.length > 0 && (
        <List sx={{ width: '400px', ml: 'auto', mr: 'auto' }}>
          {filteredContacts.map(({ name, id, number }) => (
            <ContactItem key={id} name={name} id={id} phone={number} />
          ))}
        </List>
      )}
    </>
  );
};
