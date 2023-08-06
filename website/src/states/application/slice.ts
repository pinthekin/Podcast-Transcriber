import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import type { RootState } from '../store'

// Define a type for the slice state
//
// NOTE: Don't use Set or Map
// - Set and Map are optimized for mutability (https://github.com/reduxjs/redux/issues/1499)
// - Set can't be serialized

// Redux State for Collection
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface ApplicationState {
  blocks: string[],
}

// Define the initial state using that type
const initialState: ApplicationState = {
  blocks: [],
}

export const applicationSlice = createSlice({
  name: 'application',
  initialState,
  reducers: {
    // updateJWT: (state, action: PayloadAction<string>) => {
    //   state.jwt = isValidJWT(action.payload) ? action.payload : undefined
    // },
    // removeJWT: (state) => {
    //   state.jwt = undefined
    // },
    // setUploadModalOpen: (state, action: PayloadAction<boolean>) => {
    //   state.isUploadModalOpen = action.payload
    // },
  },
})

// export const { updateJWT, removeJWT, setUploadModalOpen } = applicationSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectBlocks = (state: RootState): string[] => state.application.blocks
// export const selectIsUploadModalOpen = (state: RootState): boolean => state.application.isUploadModalOpen

export default applicationSlice.reducer
