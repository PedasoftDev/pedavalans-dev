import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import type { RootState } from '../store';
import IEmployeeDashboard from '../interfaces/IEmployeeDashboard';

interface IState {
  value: null | IEmployeeDashboard.IBase
}

const initialState: IState = {
  value: null,
}

const employeeDashboard = createSlice({
  name: 'employeeDashboard',
  initialState,
  reducers: {
    setEmployeeDashboard: (state, action: PayloadAction<IEmployeeDashboard.IBase>) => {
      state.value = action.payload
    },
    setEmployeeDashboardToNull: (state) => {
      state.value = null
    },
  },
})

export const { setEmployeeDashboard, setEmployeeDashboardToNull } = employeeDashboard.actions

export const selectEmployeeDashboard = (state: RootState) => state.employeeDashboard.value

export default employeeDashboard.reducer
