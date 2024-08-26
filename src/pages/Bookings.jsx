import Heading from "../ui/Heading";
import Row from "../ui/Row";
import BookingsTable from "../features/bookings/BookingTable";
import BookingTableOperations from "../features/bookings/BookingTableOperations";
import Button from "../ui/Button";
import Modal from "../ui/Modal";
import CreateBookingsForm from "../features/bookings/CreateBookingsForm";

function Bookings() {
  return (
    <Modal>
      <Row type="horizontal">
        <Heading as="h1">All bookings</Heading>
        <BookingTableOperations />
      </Row>
      <Row type="flexEnd">
        <Modal.Open opens="new-booking">
          <Button variation="primary">Create New Booking</Button>
        </Modal.Open>
      </Row>
      <Modal.Window name="new-booking">
        <CreateBookingsForm/>
      </Modal.Window>
      <BookingsTable />
    </Modal>
  );
}

export default Bookings;
