import { useUserContext } from './UserContext';

const Filter = () => {
    const { dispatch } = useUserContext();
    return (
        <div>
            <input
                type="text"
                placeholder="Tìm kiếm theo tên..."
                onChange={(e) => dispatch({ type: 'SET_SEARCH', payload: e.target.value })}
            />
            <input
                type="text"
                placeholder="Lọc theo tuổi..."
                onChange={(e) => dispatch({ type: 'SET_FILTER', payload: { age: e.target.value } })}
            />
            <select onChange={(e) => dispatch({ type: 'SET_FILTER', payload: { role: e.target.value } })}>
                <option value="">Tất cả vai trò</option>
                <option value="admin">Admin</option>
                <option value="user">User</option>
            </select>
        </div>
    );
};

export default Filter;
