import { useMutation, useQuery } from "@tanstack/react-query";
import { createBookings } from "../../services/apiBookings";
import toast from "react-hot-toast";

export function useCreateBookings() {
  const { mutate: createBooking, isPending: isCreating } = useMutation({
    mutationFn: createBookings,
    onSuccess: (booking) => {
        console.log(booking);
      toast.success(`Booking #${booking.id} created successfully`);
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { createBooking, isCreating };
}
