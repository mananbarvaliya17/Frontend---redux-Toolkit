import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
  name: "search",
  initialState: {
    query: "",
    activeTabs: "photos",
    result: [],
    loading: false,
    error: null,
  },
  reducers: {
    setQuery(state, action) {
      state.query = (action.payload || '').trim();
    },
    setActiveTabs(state, action) {
      state.activeTabs = action.payload;
    },
    setResults(state, action) {
      state.result = action.payload;
      state.loading = false;
      state.error = null;
    },
    setLoading(state, action) {
      state.loading = action.payload ?? true;
      if (state.loading) {
        state.error = null;
      }
    },
    setError(state, action) {
      state.loading = false;
      state.error = action.payload === undefined
        ? 'Unable to fetch results right now.'
        : action.payload;
    },
    clearResults(state) {
      state.result = [];
    },
  },
});

export const {
  setQuery,
  setActiveTabs,
  setResults,
  setLoading,
  setError,
  clearResults,
} = searchSlice.actions;

export default searchSlice.reducer;
