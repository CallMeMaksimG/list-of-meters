import { useStore } from '../../store/RootStore';
import './Pagination.scss';

const Pagination = (): JSX.Element => {
  const pageNumbers = [1, 2, 3, 4, 5];
  const rootStore = useStore();
  return (
    <div className="pagination">
      <ul className="pagination__list">
        {pageNumbers.map((number, i) => (
          <li
            key={i}
            className={
              number === rootStore.currentPage
                ? 'pagination__list-item pagination__list-item--active'
                : 'pagination__list-item'
            }
          >
            <button onClick={() => rootStore.paginate(number)}>{number}</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Pagination;
