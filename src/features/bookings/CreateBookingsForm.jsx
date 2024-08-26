import { useForm, useWatch } from "react-hook-form";
import Button from "../../ui/Button";
import Checkbox from "../../ui/Checkbox";
import Dropdown from "../../ui/Dropdown";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useCabins } from "../cabins/useCabins";
import { useEffect, useState } from "react";
import Spinner from "../../ui/Spinner";
import { createBookings, guestBasedCabins } from "../../services/apiBookings";
import { differenceInDays } from "date-fns";
import { getCountryFlag } from "../../utils/helpers";
import { useCreateBookings } from "./useCreateBookings";

export default function CreateBookingsForm({onCloseModal}) {
  const { cabins, isLoading: isLoadingCabins } = useCabins();

  const { createBooking, isCreating } = useCreateBookings();

  const [cabinNames, setCabinNames] = useState(() =>
    cabins?.reduce((acc, cur) => {
      [
        ...acc,
        {
          name: cur.name,
          maxCapacity: cur.maxCapacity,
        },
      ];
      return acc;
    }, [])
  );

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    getValues,
    watch,
    reset
  } = useForm({
    defaultValues: {
      payment: false,
      startDate: new Date().toISOString().split("T")[0],
      numGuests: 1,
    },
  });

  const numGuests = useWatch({
    control,
    name: "numGuests",
  });

  const [isPaid] = watch(["isPaid"]);

  useEffect(() => {
    async function getCabinsName() {
      const numGuest = Number(numGuests);
      const data = await guestBasedCabins(numGuest);
      setCabinNames(data);
    }
    getCabinsName();
  }, [numGuests]);

  function onSubmit({
    fullName,
    email,
    nationality,
    numGuests,
    cabinName,
    startDate,
    endDate,
    hasBreakfast,
    isPaid,
  }) {
    const countryFlag = getCountryFlag(nationality);

    const guestData = {
      fullName,
      email,
      nationality,
      countryFlag,
      nationalID: "",
    };

    const bookingData = {
      startDate,
      endDate,
      hasBreakfast,
      isPaid,
      cabinName,
      numGuests,
      status: "checked-in",
    };

    createBooking({ guestData, bookingData },{
      onSuccess : ()=>{
        reset();
        onCloseModal();
      }
    });
  }

  if (isLoadingCabins) return <Spinner />;

  return (
    <Form type="scrollModal" onSubmit={handleSubmit(onSubmit)}>
      <FormRow type="customRow">
        <FormRow
          label="Full Name"
          type="customColumn"
          error={errors?.fullName?.message}
        >
          <Input
            type="text"
            id="fullName"
            disabled={isCreating}
            {...register("fullName", {
              required: "This Field is Required",
            })}
          />
        </FormRow>
        <FormRow
          label="Email"
          type="customColumn"
          error={errors?.email?.message}
        >
          <Input
            type="email"
            id="email"
            disabled={isCreating}
            {...register("email", {
              required: "This Field is Required",
            })}
          />
        </FormRow>
      </FormRow>
      <FormRow
        label="Nationality"
        type="customColumn"
        error={errors?.nationality?.message}
      >
        <Input
          type="text"
          id="nationality"
          disabled={isCreating}
          {...register("nationality", {
            required: "This Field is Required",
          })}
        />
      </FormRow>
      <FormRow type="customRow">
        <FormRow label="Guests" type="customColumn">
          <Dropdown
            id="numGuests"
            disabled={isCreating}
            register={register}
            options={[
              { label: 1, value: 1 },
              { label: 2, value: 2 },
              { label: 3, value: 3 },
              { label: 4, value: 4 },
              { label: 5, value: 5 },
              { label: 6, value: 6 },
            ]}
          />
        </FormRow>
        <FormRow label="Available Cabins" type="customColumn">
          <Dropdown
            id="cabinName"
            disabled={isCreating}
            register={register}
            options={cabinNames?.map((cabin) => ({
              label: `${cabin.name} (MaxGuests-${cabin.maxCapacity})`,
              value: cabin.name,
            }))}
          />
        </FormRow>
      </FormRow>
      <FormRow type="customRow">
        <FormRow
          label="Start Date"
          type="customColumn"
          error={errors?.startDate?.message}
        >
          <Input
            type="date"
            id="startDate"
            disabled={isCreating}
            {...register("startDate", {
              required: "This Field is Required",
            })}
          />
        </FormRow>
        <FormRow
          label="End Date"
          type="customColumn"
          error={errors?.endDate?.message}
        >
          <Input
            type="date"
            id="endDate"
            disabled={isCreating}
            {...register("endDate", {
              required: "This Field is Required",
              validate: (value) =>
                differenceInDays(value, getValues().startDate) > 0 ||
                "End date must be higher than start date",
            })}
          />
        </FormRow>
      </FormRow>
      <FormRow>
        <Checkbox id="hasBreakfast" register={register} disabled={isCreating}>
          With Breakfast
        </Checkbox>
        <Checkbox id="isPaid" register={register} disabled={isCreating}>
          Booking Confirmation
        </Checkbox>
        <Button
          size="medium"
          variation="primary"
          disabled={Boolean(!getValues().isPaid) || isCreating}
        >
          Book Now
        </Button>
      </FormRow>
    </Form>
  );
}
