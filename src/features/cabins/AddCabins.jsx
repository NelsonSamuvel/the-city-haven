import React, { useState } from "react";
import Button from "../../ui/Button";
import CreateCabinForm from "./CreateCabinForm";
import Modal from "../../ui/Modal";
import CabinTable from "./CabinTable";

function AddCabins() {
  return (
    <div>
      <Modal>
        <Modal.Open opens="cabin-form">
          <Button>Add new cabin</Button>
        </Modal.Open>
        <Modal.Window name="cabin-form">
          <CreateCabinForm />
        </Modal.Window>
      </Modal>
    </div>
  );
}

// const AddCabins = () => {
//   const [isShow, setIsShow] = useState(false);

//   return (
//     <>
//       <Button onClick={() => setIsShow((show) => !show)}>Add new cabin</Button>
//       {isShow && (
//         <Modal onClose={()=>setIsShow(false)}>
//           <CreateCabinForm onCloseModal={()=>setIsShow(false)}/>
//         </Modal>
//       )}
//     </>
//   );
// };

export default AddCabins;
