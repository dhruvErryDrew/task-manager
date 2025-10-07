import { useAtom } from 'jotai';
import { filterAtom } from '../../Atoms';
import './FilterPanel.css';

function FilterPanel() {
    const [filter, setFilter] = useAtom(filterAtom);

    function handleFilterChange(key, value) {
        setFilter(prev => ({
            ...prev,
            [key]: value
        }));
    }

    return (
        <div className="filter-panel">
            <div className="filter-group">
                <label htmlFor="status-filter">Status:</label>
                <select
                    id="status-filter"
                    value={filter.status}
                    onChange={(e) => handleFilterChange('status', e.target.value)}
                    className="filter-select"
                >
                    <option value="all">All Tasks</option>
                    <option value="pending">Pending</option>
                    <option value="completed">Completed</option>
                </select>
            </div>

            <div className="filter-group">
                <label htmlFor="category-filter">Category:</label>
                <select
                    id="category-filter"
                    value={filter.category}
                    onChange={(e) => handleFilterChange('category', e.target.value)}
                    className="filter-select"
                >
                    <option value="all">All Categories</option>
                    <option value="Work">Work</option>
                    <option value="Personal">Personal</option>
                    <option value="Shopping">Shopping</option>
                    <option value="Health">Health</option>
                    <option value="Education">Education</option>
                    <option value="General">General</option>
                </select>
            </div>

            <div className="filter-group">
                <label htmlFor="search-filter">Search:</label>
                <input
                    type="text"
                    id="search-filter"
                    value={filter.search}
                    onChange={(e) => handleFilterChange('search', e.target.value)}
                    placeholder="Search tasks..."
                    className="filter-input"
                />
            </div>

            <button 
                className="clear-filters-button"
                onClick={() => setFilter({ status: 'all', category: 'all', search: '' })}
            >
                Clear Filters
            </button>
        </div>
    );
}

export default FilterPanel;
