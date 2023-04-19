
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthProvider } from '../../../../helpers/AuthProviders';

export interface Auth {
    email: string;
    password: string
}

export interface AdditionalUserInfo {
    isNewUser: boolean;
    profile?: Record<string, any>;
    providerId: string;
    username?: string;
}

export interface UserCredential {
    additionalUserInfo?: AdditionalUserInfo;
    user: {
        displayName: string | null;
        email: string | null;
    };
}

const initialUserAuthState: any = {
    additionalUserInfo: undefined,
    user: { displayName: "", email: "" },
    isLoggedIn: false,
};


export const loginViaEmailandPass = createAsyncThunk(
    'user/login',
    async (object: Auth, { dispatch, getState }) => {
        try {
            return AuthProvider.login(object.email, object.password)
        } catch (error) {
        }
    }
);

export const registreViaEmailandPass = createAsyncThunk(
    'user/register',
    async (object: Auth, { dispatch, getState }) => {
        try {
            return AuthProvider.register(object.email, object.password)
        } catch (error) {
        }
    }
);

export const UserAuthSlice = createSlice({
    name: 'userAuth',
    initialState: initialUserAuthState,
    reducers: {
        logIn: (state, action: PayloadAction<UserCredential>) => {
            state.additionalUserInfo = action.payload.additionalUserInfo
            state.user = action.payload.user
            state.isLoggedIn = true;
        },
        resgister: (state, action) => {
            state.additionalUserInfo = action.payload.additionalUserInfo
            state.user = action.payload.user
            state.isLoggedIn = true;
        },
        logOut: (state) => {
            state.userToken = '';
            state.isLoggedIn = false;
            AuthProvider.logout();
        },
    },
});

export const UserAuthActions = {
    ...UserAuthSlice.actions,
    loginViaEmailandPass,
    registreViaEmailandPass
};
