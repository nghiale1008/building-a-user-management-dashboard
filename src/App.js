import { useEffect } from 'react';
import Filter from './Filter';
import UserTable from './UserTable';
import Pagination from './Pagination';
import { useUserContext } from './UserContext';
import { UserProvider } from './UserContext';

function App() {
    const { dispatch } = useUserContext();

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch('https://dummyjson.com/users');
            const data = await res.json();

            dispatch({ type: 'SET_USERS', payload: data.users });
        };

        fetchData();
    }, [dispatch]);
    return (
        <div className="App">
            <h1>Quản lý người dùng</h1>
            <Filter />
            <UserTable />
            <Pagination />
        </div>
    );
}

export default () => (
    <UserProvider>
        <App />
    </UserProvider>
);
