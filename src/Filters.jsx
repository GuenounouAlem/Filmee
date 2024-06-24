import { useState } from "react";

const Filter = () => {
    const categories = [
        { name: 'How good ?', filters: ['Weak', 'Mid','Peak'] },  // weak is 0-4 / / mid is 4-7 // peak is 7-10 
        { name: 'How Old ?', filters: ['Relics', 'Boomers', 'OGs','Zzz'] }, // relics is <60s // boomers 60s-80s // ogs is 80s -00s // zzz is 00s-to now 
        
      ];
    
      const [activeFilters, setActiveFilters] = useState([]);
    
      const toggleFilter = (filter) => {
        setActiveFilters((prevFilters) =>
          prevFilters.includes(filter)
            ? prevFilters.filter((f) => f !== filter)
            : [...prevFilters, filter]
        );
      };
    
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
                      onClick={() => toggleFilter(filter)}
                      className={`btn ${
                        activeFilters.includes(filter) ? 'btn-primary' : 'btn-outline'
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
