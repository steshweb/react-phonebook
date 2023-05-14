import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  selectContactError,
  selectContacts,
} from 'redux/constats/contactsSelectors';
import { addContact } from 'redux/constats/contactsThunk';
import { TextField, Button, FormHelperText, Typography } from '@mui/material';
import { FormStyle } from './ContactForm.styled';

export const ContactForm = () => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const contacts = useSelector(selectContacts);
  const dispatch = useDispatch();
  const error = useSelector(selectContactError);

  const handleSubmit = e => {
    e.preventDefault();
    const result = contacts.some(contact => contact.name === name);

    if (result) {
      alert(`${name} is already in contacts`);
      return;
    }

    dispatch(addContact({ name, number }));
    reset();
  };

  const handleChange = e => {
    const { value, name } = e.currentTarget;

    switch (name) {
      case 'name':
        setName(value);
        break;

      case 'number':
        setNumber(value);
        break;

      default:
        return;
    }
  };

  const reset = () => {
    setName('');
    setNumber('');
  };

  return (
    <FormStyle onSubmit={handleSubmit}>
      <Typography variant="h5" component="h3" sx={{ fontWeight: '700' }}>
        Phonebook
      </Typography>
      <TextField
        type="text"
        name="name"
        label="Name"
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        required
        value={name}
        onChange={handleChange}
        size="small"
      />
      <TextField
        label="number"
        type="tel"
        name="number"
        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        required
        value={number}
        onChange={handleChange}
        size="small"
      />

      {error && <FormHelperText error>Contacts not found</FormHelperText>}
      <div>
        <Button type="submit" children="Add contact" variant="outlined" />
      </div>
    </FormStyle>
  );
};
