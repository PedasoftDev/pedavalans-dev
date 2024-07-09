import { configureStore } from '@reduxjs/toolkit'
import assignEducation from './features/assignEducation'
import pendingEvaluation from './features/pendingEvaluation'
import employeeDashboard from './features/employeeDashboard'
import competencyStatusReport from './features/competencyStatusReport';
// ...

const store: any = configureStore({
  reducer: {
    assignEducation: assignEducation,
    pendingEvaluation: pendingEvaluation,
    employeeDashboard: employeeDashboard,
    competencyStatusReport: competencyStatusReport
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
