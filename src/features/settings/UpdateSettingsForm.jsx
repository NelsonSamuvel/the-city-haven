import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Spinner from "../../ui/Spinner";
import { useSettings } from "./useSettings";
import { useUpdateSetting } from "./useUpdateSetting";

function UpdateSettingsForm() {
  const {
    isLoading,
    settings: {
      minBookingLength,
      maxBookingLength,
      maxGuestsPerBooking,
      breakFastPrice,
    } = {},
  } = useSettings();

  const { isSetting, updateSetting } = useUpdateSetting();

  function handleSetting(e, field) {
    const { value } = e.target;
    if (!value) return;
    updateSetting({ [field]: value });
  }


  if(isLoading) return <Spinner/>
 
  return (
    <Form>
      <FormRow label="Minimum nights/booking">
        <Input
          type="number"
          id="min-nights"
          disabled={isSetting}
          defaultValue={minBookingLength}
          onBlur={(e) => handleSetting(e, "minBookingLength")}
        />
      </FormRow>
      <FormRow label="Maximum nights/booking">
        <Input
          type="number"
          id="max-nights"
          disabled={isSetting}
          defaultValue={maxBookingLength}
          onBlur={(e) => handleSetting(e, "maxBookingLength")}
        />
      </FormRow>
      <FormRow label="Maximum guests/booking">
        <Input
          type="number"
          id="max-guests"
          disabled={isSetting}
          defaultValue={maxGuestsPerBooking}
          onBlur={(e) => handleSetting(e, "maxGuestsPerBooking")}
        />
      </FormRow>
      <FormRow label="Breakfast price">
        <Input
          type="number"
          id="breakfast-price"
          disabled={isSetting}
          defaultValue={breakFastPrice}
          onBlur={(e) => handleSetting(e, "breakFastPrice")}
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
