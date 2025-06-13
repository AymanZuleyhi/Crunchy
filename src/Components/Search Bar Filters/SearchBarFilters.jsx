import "./SearchBarFilters.css";
import SearchBarFilter from "../Search Bar Filter/SearchBarFilter";

function SearchBarFilters(props) {
  const { filters, removeAllFilters, removeFilter } = props;

  return (
    <div className="SEARCH-BAR_FILTERS">
      <div className="search-bar_filters">
        <p style={{ marginRight: "10px" }}>Search for recipes that include:</p>
        
        {
          filters?.map((filter) => {
            return (
              <SearchBarFilter 
                key={filter} 
                filter={filter} 
                removeFilter={removeFilter}
              />
            )
          })
        }
      </div>

      <p onClick={removeAllFilters} className="remove-filters">Remove all filters</p>   
    </div>
  )
};

export default SearchBarFilters;