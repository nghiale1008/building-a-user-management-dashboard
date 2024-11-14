import { useUserContext } from './UserContext';

const Pagination = () => {
    const { state, dispatch } = useUserContext();
    const { users, itemsPerPage, currentPage } = state;
    const totalPage = Math.ceil(users.length / itemsPerPage);

    return (
        <div>
            {[...Array(totalPage)].map((_, index) => (
                <button
                    onClick={() => dispatch({ type: 'SET_PAGE', payload: index + 1 })}
                    disabled={currentPage === index + 1}
                >
                    {index + 1}
                </button>
            ))}
        </div>
    );
};
export default Pagination;
