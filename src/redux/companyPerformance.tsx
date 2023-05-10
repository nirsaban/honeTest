// Please note that this gist follows the repo available at: https://github.com/delasign/react-redux-tutorial
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ReduxInitState } from '../common/interface/reduxInitState.interface';
import { CompanyEntity } from '../common/entities/company.entity';
import { PerformanceCompanyOrder } from '../common/entities/performenceCountries.entitiy';

const initialState: ReduxInitState = {
  companiesPerformance: null
};

export const companiesPerformanceSlice = createSlice({
  name: 'companiesPerformance',
  initialState: initialState,
  reducers: {
    setCompaniesPerformance: (state, action: PayloadAction<PerformanceCompanyOrder[]>) => {
      console.log('EHRE');
      state.companiesPerformance = action.payload;
    }
  }
});

// Action creators are generated for each case reducer function
export const { setCompaniesPerformance } = companiesPerformanceSlice.actions;
// You must export the reducer as follows for it to be able to be read by the store.
export default companiesPerformanceSlice.reducer;
