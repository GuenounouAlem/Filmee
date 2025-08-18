import { createContext, useState } from "react";


export const FilterContext = createContext();

export const FilterProvider = ({ children }) => {
  const [activeFilters, setActiveFilters] = useState({
    good: [],
    old: [],
    kind: []
  });

  const toggleFilter = (filterType, value) => {
    setActiveFilters(prev => ({
      ...prev,
      [filterType]: prev[filterType].includes(value)
        ? prev[filterType].filter(item => item !== value)
        : [...prev[filterType], value]
    }));
  };

  return (
    <FilterContext.Provider value={{ activeFilters, toggleFilter }}>
      {children}
    </FilterContext.Provider>
  );
};
