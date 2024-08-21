import SortBy from "../../ui/SortBy";
import Filter from "../../ui/Filter";
import TableOperations from "../../ui/TableOperations";

function BookingTableOperations() {
  return (
    <TableOperations>
      <Filter
        filterField="status"
        filterOptions={[
          { value: "all", filterName: "All" },
          { value: "checked-out", filterName: "Checked out" },
          { value: "checked-in", filterName: "Checked in" },
          { value: "unconfirmed", filterName: "Unconfirmed" },
        ]}
      />

      <SortBy
        sortField="sortBy"
        sortOptions={[
          { value: "startDate-desc", sortName: "Sort by date (recent first)" },
          { value: "startDate-asc", sortName: "Sort by date (earlier first)" },
          {
            value: "totalPrice-desc",
            sortName: "Sort by amount (high first)",
          },
          { value: "totalPrice-asc", sortName: "Sort by amount (low first)" },
        ]}
      />
    </TableOperations>
  );
}

export default BookingTableOperations;
