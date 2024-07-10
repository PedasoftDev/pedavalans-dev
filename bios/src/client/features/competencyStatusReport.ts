import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import type { RootState } from '../store';

interface IState {
  value: null | any
}

const initialState: IState = {
  value: null,
}

const competencyStatusReport = createSlice({
  name: 'competencyStatusReport',
  initialState,
  reducers: {
    setCompetencyStatusReport: (state, action: PayloadAction) => {
      state.value = action.payload
    },
    setCompetencyStatusReportToNull: (state) => {
      state.value = null
    },
  },
})

export const { setCompetencyStatusReport, setCompetencyStatusReportToNull } = competencyStatusReport.actions

export const selectCompetencyStatusReport = (state: RootState) => state.competencyStatusReport.value

export default competencyStatusReport.reducer