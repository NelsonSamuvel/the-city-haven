import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCabins as deleteCabinsApi } from "../../services/apiCabins";
import toast from "react-hot-toast";

export function useDeleteCabins(){

    const queryClient = useQueryClient();

    const { isPending:isDeleting, mutate: deleteCabins } = useMutation({
        mutationFn: deleteCabinsApi,
        onSuccess: () => {
          toast.success("Cabin successfully deleted");
          queryClient.invalidateQueries({
            queryKey: ["cabins"],
          });
        },
        onError: (err) => toast.error(err.message),
      });


      return {isDeleting,deleteCabins}

}