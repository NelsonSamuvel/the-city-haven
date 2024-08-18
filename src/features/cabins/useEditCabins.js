import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addEditCabins } from "../../services/apiCabins";
import toast from "react-hot-toast";

export function useEditCabins(){


    const queryClient = useQueryClient();

    const { mutate: editCabin, isPending: isEditing } = useMutation({
        mutationFn: ({ newCabinData, id }) => addEditCabins(newCabinData, id),
        onSuccess: () => {
          toast.success("cabin has been edited successfully");
          queryClient.invalidateQueries({
            queryKey: ["cabins"],
          });
        },
        onError: (err) => {
          toast.error(err.message);
        },
      });


      return {editCabin,isEditing}
}

