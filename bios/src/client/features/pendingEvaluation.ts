import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import type { RootState } from '../store';

interface IState {
  value: null | { polyvalence_table_id: string; evaluation_period: string; }
}

const initialState: IState = {
  value: null,
}

const pendingEvaluation = createSlice({
  name: 'pendingEvaluation',
  initialState,
  reducers: {
    setPendingEvaluation: (state, action: PayloadAction<{ polyvalence_table_id: string; evaluation_period: string; }>) => {
      state.value = action.payload
    },
    setPendingEvaluationToNull: (state) => {
      state.value = null
    },
  },
})

export const { setPendingEvaluation, setPendingEvaluationToNull } = pendingEvaluation.actions

export const selectPendingEvaluation = (state: RootState) => state.pendingEvaluation.value

export default pendingEvaluation.reducer