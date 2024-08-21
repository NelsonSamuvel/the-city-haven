import { useQuery } from "@tanstack/react-query";
import { getBookingData } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";

export function useBookings() {
  const [searchParams] = useSearchParams();

  const filterValue = searchParams.get("status") || "all";

  const filter =
    !filterValue || filterValue === "all"
      ? null
      : { field: "status", value: filterValue };
  // [
  //   { field: "status", value: filterValue,method:"eq" },
  //   { field: "totalPrice", value: 5000, method: "gte" },
  // ];

  //SORT
  const sortValue = searchParams.get("sortBy");

  const [field,direction] = sortValue.split("-");

  const sortBy = {field,direction}


  const { data: bookings, isLoading } = useQuery({
    queryKey: ["bookings", filter,sortBy],
    queryFn: () => getBookingData({ filter,sortBy }),
  });

  return { bookings, isLoading };
}
