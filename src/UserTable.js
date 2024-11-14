import { useMemo } from 'react';
import { useUserContext } from './UserContext';

const UserTable = () => {
    const { state, dispatch } = useUserContext();
    const { users, search, filter, sort, currentPage, itemsPerPage } = state; // Set default value for search

    const processedUsers = useMemo(() => {
        let filteredUsers = users
            .filter((user) => user.firstName.toLowerCase().includes(search.toLowerCase()))
            .filter((user) => (filter.age ? user.age === Number(filter.age) : true))
            .filter((user) => (filter.role ? user.role === filter.role : true));

        if (sort.key) {
            filteredUsers.sort((a, b) => {
                if (a[sort.key] < b[sort.key]) return sort.order === 'asc' ? -1 : 1;
                if (a[sort.key] > b[sort.key]) return sort.order === 'asc' ? 1 : -1;
                return 0;
            });
        }

        return filteredUsers;
    }, [users, search, filter, sort]);

    const paginatedUsers = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return processedUsers.slice(startIndex, startIndex + itemsPerPage);
    }, [processedUsers, currentPage, itemsPerPage]);

    const handleSort = (key) => {
        dispatch({
            type: 'SET_SORT',
            payload: {
                key,
                order: sort.key === key && sort.order === 'asc' ? 'desc' : 'asc',
            },
        });
    };

    return (
        <table>
            <thead>
                <tr>
                    <th onClick={() => handleSort('firstName')}>
                        Tên {sort.key === 'firstName' ? (sort.order === 'asc' ? '↑' : '↓') : ''}
                    </th>
                    <th onClick={() => handleSort('age')}>
                        Tuổi {sort.key === 'age' ? (sort.order === 'asc' ? '↑' : '↓') : ''}
                    </th>
                    <th onClick={() => handleSort('role')}>
                        Vai trò {sort.key === 'role' ? (sort.order === 'asc' ? '↑' : '↓') : ''}
                    </th>
                </tr>
            </thead>
            <tbody>
                {paginatedUsers.map((user) => (
                    <tr key={user.id}>
                        <td>{user.firstName}</td>
                        <td>{user.age}</td>
                        <td>{user.role}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default UserTable;
