export const initState = {
  contacts: {
    items: [],
    isLoading: false,
    error: null,
  },
  filter: '',
  auth: {
    user: { name: null, email: null },
    token: null,
    isLoggedIn: false,
    isRefreshing: false,
    error: null,
  },
};
