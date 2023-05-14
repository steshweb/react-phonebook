import { createSelector } from '@reduxjs/toolkit';
import { selectContacts } from 'redux/constats/contactsSelectors';

export const selectFilter = state => state.filter;

export const selectFilteredContacts = createSelector(
  [selectContacts, selectFilter],
  (contacts, filter) => {
    const filterNormalize = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filterNormalize)
    );
  }
);
