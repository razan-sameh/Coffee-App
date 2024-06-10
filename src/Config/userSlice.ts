import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
    name: 'counter',
    initialState: {
        UID: 0
    },
    reducers: {
        increment: state => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes
            state.UID += 1
        },
    }
})

// Action creators are generated for each case reducer function
export const { increment } = userSlice.actions

export default userSlice.reducer