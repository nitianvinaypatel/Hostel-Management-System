import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UiState {
    sidebarOpen: boolean;
    theme: 'light' | 'dark' | 'system';
    notifications: {
        id: string;
        message: string;
        type: 'success' | 'error' | 'warning' | 'info';
    }[];
}

const initialState: UiState = {
    sidebarOpen: true,
    theme: 'system',
    notifications: [],
};

const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        toggleSidebar: (state) => {
            state.sidebarOpen = !state.sidebarOpen;
        },
        setSidebarOpen: (state, action: PayloadAction<boolean>) => {
            state.sidebarOpen = action.payload;
        },
        setTheme: (state, action: PayloadAction<'light' | 'dark' | 'system'>) => {
            state.theme = action.payload;
        },
        addNotification: (state, action: PayloadAction<Omit<UiState['notifications'][0], 'id'>>) => {
            state.notifications.push({
                ...action.payload,
                id: Date.now().toString(),
            });
        },
        removeNotification: (state, action: PayloadAction<string>) => {
            state.notifications = state.notifications.filter((n) => n.id !== action.payload);
        },
    },
});

export const { toggleSidebar, setSidebarOpen, setTheme, addNotification, removeNotification } = uiSlice.actions;
export default uiSlice.reducer;
