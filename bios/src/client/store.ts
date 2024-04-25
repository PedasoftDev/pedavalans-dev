import { configureStore } from '@reduxjs/toolkit'
import assignEducation from './features/assignEducation'
// ...

const store: any = configureStore({
  reducer: {
    assignEducation: assignEducation,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store