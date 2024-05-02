import { configureStore } from '@reduxjs/toolkit'
import assignEducation from './features/assignEducation'
import pendingEvaluation from './features/pendingEvaluation'
// ...

const store: any = configureStore({
  reducer: {
    assignEducation: assignEducation,
    pendingEvaluation: pendingEvaluation,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store