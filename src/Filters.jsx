import { useContext } from 'react';
import { FilterContext } from './FilterContext';

const Filter = () => {
  const { activeFilters, toggleFilter } = useContext(FilterContext);

  const categories = [
    { name: 'How good ?', filters: ['Weak', 'Mid', 'Peak'] , key: 'good'},
    { name: 'How Old ?', filters: ['Relics', 'Boomers', 'OGs', 'Zzz'], key: 'old' },
    { name: 'What kind ?', filters: ['Action','Comedy','Thriller','Adventure','Science Fiction','Fantasy','Animation','Drama','Mystery','Romance'], key : 'kind'},
  ];

     console.log(activeFilters);

  return (
    <div className="card w-full max-w-lg bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">Feel mee</h2>
        {categories.map((category) => (
          <div key={category.name}>
            <h3 className="font-bold mt-4">{category.name}</h3>
            <div className="flex flex-wrap gap-2 mt-2">
              {category.filters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => toggleFilter(category.key, filter)}
                  className={`btn ${
                    activeFilters[category.key].includes(filter) ? 'btn-primary' : 'btn-outline'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
          
        ))}
        <div className="mt-4">
          <h4 className="font-bold">Active Filters:</h4>
          <div>{activeFilters.length > 0 ? activeFilters.join(', ') : 'None'}</div>
        </div>
      </div>
    </div>
  );
};

export default Filter;