import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isModalOpen: false,
  editingDomainId: null,
  selectedDomainData: null,
  filter: {
    status: '',
    query: '',
  },
};

export const domainSlice = createSlice({
  name: 'domainUi',
  initialState,
  reducers: {
    openDomainModal: (state) => {
      state.isModalOpen = true;
    },
    closeDomainModal: (state) => {
      state.isModalOpen = false;
      state.editingDomainId = null;
      state.selectedDomainData = null;
    },
    setEditingDomain: (state, action) => {
      if (action.payload && action.payload.id) {
        state.editingDomainId = action.payload.id;
        state.selectedDomainData = action.payload;
        state.isModalOpen = true;
      } else {
        state.editingDomainId = null;
        state.selectedDomainData = null;
      }
    },
    setSelectedDomainData: (state, action) => {
      state.selectedDomainData = action.payload;
      if (action.payload && action.payload.id) {
        state.editingDomainId = action.payload.id;
      }
    },
    setFilterStatus: (state, action) => {
      state.filter.status = action.payload;
    },
    setFilterQuery: (state, action) => {
      state.filter.query = action.payload;
    },
    resetFilters: (state) => {
      state.filter.status = initialState.filter.status;
      state.filter.query = initialState.filter.query;
    },
  },
});

export const {
  openDomainModal,
  closeDomainModal,
  setEditingDomain,
  setSelectedDomainData,
  setFilterStatus,
  setFilterQuery,
  resetFilters,
} = domainSlice.actions;

export default domainSlice.reducer;
