import { useSearchParams } from "react-router-dom";
import Select from "./Select";

function SortBy({ sortField, sortOptions }) {
  const [searchParams, setSearchPrams] = useSearchParams();


  const currentSortVal = searchParams.get(sortField) || "";

  function handleChange(e) {
    searchParams.set(sortField, e.target.value);
    setSearchPrams(searchParams);
  }

  return (
    <Select
      sortOptions={sortOptions}
      onChange={handleChange}
      value={currentSortVal}
      type="white"
    />
  );
}

export default SortBy;
