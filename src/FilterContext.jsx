import { createContext, useState } from "react";


export const FilterContext = createContext();

export const FilterProvider = ({ children }) => {
  const [activeFilters, setActiveFilters] = useState({
    'good' : [],
    'old' : [],
    'kind' : []
  });

  const toggleFilter = (filter) => {
    setActiveFilters((prevFilters) =>
      prevFilters.includes(filter)
        ? prevFilters.filter((f) => f !== filter)
        : [...prevFilters, filter]
    );
  };

  return (
    <FilterContext.Provider value={{ activeFilters, toggleFilter }}>
      {children}
    </FilterContext.Provider>
  );
};
