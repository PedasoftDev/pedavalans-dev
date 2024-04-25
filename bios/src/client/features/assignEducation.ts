import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import IAssignedEducation from '../interfaces/IAssignedEducation'
import type { RootState } from '../store';

interface IState {
  value: null | IAssignedEducation.IBase
}

const initialState: IState = {
  value: null,
}

const assignEducation = createSlice({
  name: 'assignEducation',
  initialState,
  reducers: {
    setAssignEducation: (state, action: PayloadAction<IAssignedEducation.IBase>) => {
      state.value = action.payload
    },
    setAssignEducationToNull: (state) => {
      state.value = null
    },
  },
})

export const { setAssignEducation, setAssignEducationToNull } = assignEducation.actions

export const selectAssignEducation = (state: RootState) => state.assignEducation.value

export default assignEducation.reducer