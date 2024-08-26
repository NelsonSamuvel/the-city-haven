import Filter from "../../ui/Filter";

function DashboardFilter() {
  return (
    <Filter
      filterField="last"
      filterOptions={[
        { value: "7", filterName: "Last 7 days" },
        { value: "30", filterName: "Last 30 days" },
        { value: "90", filterName: "Last 90 days" },
      ]}
    />
  );
}

export default DashboardFilter;
