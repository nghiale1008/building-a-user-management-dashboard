import { useContext, createContext, useReducer } from 'react';

export const UserContext = createContext();

const userReducer = (state, action) => {
    switch (action.type) {
        case 'SET_USERS':
            return { ...state, users: action.payload };
        case 'SET_SEARCH':
            return { ...state, search: action.payload };
        case 'SET_FILTER':
            return { ...state, filter: action.payload };
        case 'SET_SORT':
            return { ...state, sort: action.payload };
        case 'SET_PAGE':
            return { ...state, currentPage: action.payload };
        default:
            return state;
    }
};

export const UserProvider = ({ children }) => {
    const [state, dispatch] = useReducer(userReducer, {
        users: [],
        search: '',
        filter: { age: null, role: '' },
        sort: { key: 'firstName', order: 'asc' },
        currentPage: 1,
        itemsPerPage: 10,
    });
    return <UserContext.Provider value={{ state, dispatch }}>{children}</UserContext.Provider>;
};

export const useUserContext = () => useContext(UserContext);
