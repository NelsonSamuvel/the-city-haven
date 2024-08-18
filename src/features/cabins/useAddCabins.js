import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addEditCabins } from "../../services/apiCabins";
import toast from "react-hot-toast";

export function useAddCabins(){

    const queryClient = useQueryClient();

    const { mutate: addCabin, isPending: isAdding } = useMutation({
        mutationFn: addEditCabins,
        onSuccess: () => {
          toast.success("New cabin has been added successfully");
          queryClient.invalidateQueries({
            queryKey: ["cabins"],
          });
        },
        onError: (err) => {
          toast.error(err.message);
        },
      });

      return {addCabin,isAdding};
}