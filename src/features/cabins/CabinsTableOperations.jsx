import TableOperations from "../../ui/TableOperations";
import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";

function CabinsTableOperations() {
  return (
    <TableOperations>
      <Filter
        filterField="discount"
        filterOptions={[
          { value: "all", filterName: "All" },
          { value: "no-discount", filterName: "No-Discount" },
          { value: "with-discount", filterName: "With-Discount" },
        ]}
      />
      <SortBy
        sortField="sortBy"
        sortOptions={[
          { value: "name-asc", sortName: "Sort By Name (A-Z)" },
          { value: "name-desc", sortName: "Sort By Name (Z-A)" },
          { value: "regularPrice-asc", sortName: "Sort By Price (Low-High)" },
          { value: "regularPrice-desc", sortName: "Sort By Price (High-Low)" },
          { value: "maxCapacity-asc", sortName: "Sort By Capacity (Low-High)" },
          {
            value: "maxCapacity-desc",
            sortName: "Sort By Capacity (High-Low)",
          },
        ]}
      />
    </TableOperations>
  );
}

export default CabinsTableOperations;
