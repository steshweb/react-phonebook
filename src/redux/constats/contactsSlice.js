import { createSlice } from '@reduxjs/toolkit';
import { initState } from '../initState';
import { addContact, deleteContact, fetchContacts } from './contactsThunk';

const handlePending = state => {
  state.isLoading = true;
};

const handleRejected = (state, { payload }) => {
  state.error = payload;
  state.isLoading = false;
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: initState.contacts,
  extraReducers: builder => {
    builder
      .addCase(fetchContacts.pending, handlePending)
      .addCase(fetchContacts.fulfilled, (state, { payload }) => {
        state.items = payload;
        state.error = null;
        state.isLoading = false;
      })
      .addCase(fetchContacts.rejected, handleRejected)
      .addCase(deleteContact.pending, handlePending)
      .addCase(deleteContact.fulfilled, (state, { payload }) => {
        state.items = state.items.filter(contact => contact.id !== payload.id);
        state.error = null;
        state.isLoading = false;
      })
      .addCase(deleteContact.rejected, handleRejected)
      .addCase(addContact.pending, handlePending)
      .addCase(addContact.fulfilled, (state, { payload }) => {
        state.items.push(payload);
        state.error = null;
        state.isLoading = false;
      })
      .addCase(addContact.rejected, handleRejected);
  },
});

export const contactsReducer = contactsSlice.reducer;
