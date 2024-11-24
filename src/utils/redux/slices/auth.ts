import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
    isAuthenticated: boolean;
    fullname : string,
    keepMeLogin : string,
    token : string
}

const initialState: AuthState = {
    isAuthenticated: false,
    fullname : '',
    keepMeLogin : '',
    token : ''
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        keepLogin : (state, action: PayloadAction<string>) => {
            state.keepMeLogin = action.payload;
        },
        setFullName: (state, action: PayloadAction<string>) => {
            state.fullname = action.payload;
        },
        setAuth: (state , action: PayloadAction<boolean>) => {
            state.isAuthenticated = action.payload;
        },
    },
});

export const { keepLogin, setFullName, setAuth } = authSlice.actions;
export default authSlice.reducer;