import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "../bookings/useBooking";
import Spinner from "../../ui/Spinner";
import Checkbox from "../../ui/Checkbox";
import { useEffect, useState } from "react";
import { useCheckin } from "./useCheckin";
import { useSettings } from "../settings/useSettings";
import { formatCurrency } from "../../utils/helpers";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const [isPaidCheck, setIsPaidCheck] = useState(false);

  const [checkBreakFast, setCheckBreakFast] = useState(false);

  const moveBack = useMoveBack();

  const { booking, isLoading } = useBooking();
  const { checkin, isCheckingIn } = useCheckin();
  const { settings: { breakFastPrice } = {}, isLoading: isLoadingSetting } =
    useSettings();

  useEffect(() => {
    setIsPaidCheck(booking?.isPaid ?? false);
  }, [booking]);

  if (isLoading || isLoadingSetting) return <Spinner />;
  const {
    id: bookingId,
    guests,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
  } = booking;

  const optionalBreakFast = breakFastPrice + numGuests + numNights;
  function handleCheckin() {
    if (!isPaidCheck) return;
    if (checkBreakFast) {
      checkin({
        bookingId,
        breakFast: {
          hasBreakfast: true,
          extrasPrice: optionalBreakFast,
          totalPrice: totalPrice + optionalBreakFast,
        },
      });
    } else {
      checkin({ bookingId, breakFast: {} });
    }
  }

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      {!hasBreakfast && (
        <Box>
          <Checkbox
            checked={checkBreakFast}
            onChange={() => {
              setCheckBreakFast((check) => !check);
              setIsPaidCheck(false);
            }}
            id="break Fast"
            disabled={checkBreakFast}
          >
            Add a Breakfast(Price ${formatCurrency(optionalBreakFast)})
          </Checkbox>
        </Box>
      )}

      <Box>
        <Checkbox
          checked={isPaidCheck}
          onChange={() => setIsPaidCheck((check) => !check)}
          id={bookingId}
          disabled={isPaidCheck || isCheckingIn}
        >
          I confirm that {guests.fullName} has paid the amount of
          {!checkBreakFast
            ? formatCurrency(totalPrice)
            : `${formatCurrency(
                totalPrice + optionalBreakFast
              )}(${formatCurrency(totalPrice)} + ${formatCurrency(
                optionalBreakFast
              )} )`}
        </Checkbox>
      </Box>

      <ButtonGroup>
        <Button onClick={handleCheckin} disabled={!isPaidCheck || isCheckingIn}>
          Check in booking #{bookingId}
        </Button>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
