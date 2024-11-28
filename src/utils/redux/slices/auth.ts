import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface AuthState {
    isAuthenticated: boolean;
    user: {
        id: number,
        username: string,
        mail: string,
        fullname: string,
        dateOfBirth: string
    },
    keepMeLogin: string,
    token: string
}

const initialState: AuthState = {
    isAuthenticated: false,
    user: {
        id: 0,
        username: '',
        mail: '',
        fullname: '',
        dateOfBirth: ''
    },
    keepMeLogin: '',
    token: ''
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        keepLogin: (state, action: PayloadAction<string>) => {
            state.keepMeLogin = action.payload;
        },
        setUser: (state, action: PayloadAction<{
            id: number,
            username: string,
            mail: string,
            fullname: string,
            dateOfBirth: string
        }>) => {
            state.user.id = action.payload.id;
            state.user.username = action.payload.username;
            state.user.mail = action.payload.mail;
            state.user.fullname = action.payload.fullname;
            state.user.dateOfBirth = action.payload.dateOfBirth;
        },
        setAuth: (state, action: PayloadAction<boolean>) => {
            state.isAuthenticated = action.payload;
        },
    },
});

export const {keepLogin, setUser, setAuth} = authSlice.actions;
export default authSlice.reducer;