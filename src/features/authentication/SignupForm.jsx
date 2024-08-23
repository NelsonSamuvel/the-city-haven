import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useSignup } from "./useSignup";

// Email regex: /\S+@\S+\.\S+/

function SignupForm() {
  const { signUp, isSigningIn } = useSignup();

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
  } = useForm();

  function onSubmit({ fullName, password, email }) {
    console.log(fullName, password, email);

    signUp(
      { fullName, password, email },
      {
        onSettled: () => reset(),
      }
    );
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Full name" error={errors?.fullName?.message}>
        <Input
          type="text"
          id="fullName"
          disabled={isSigningIn}
          {...register("fullName", {
            required: "This Field is required",
          })}
        />
      </FormRow>

      <FormRow label="Email address" error={errors?.email?.message}>
        <Input
          type="email"
          id="email"
          disabled={isSigningIn}
          {...register("email", {
            required: "This Field is required",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "please enter a valid email id",
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Password (min 8 characters)"
        error={errors?.password?.message}
      >
        <Input
          type="password"
          id="password"
          disabled={isSigningIn}
          {...register("password", {
            required: "This Field is required",
            minLength: {
              value: 8,
              message: "Please enter a password minimum of 8",
            },
          })}
        />
      </FormRow>

      <FormRow label="Repeat password" error={errors?.passwordConfirm?.message}>
        <Input
          type="password"
          id="passwordConfirm"
          disabled={isSigningIn}
          {...register("passwordConfirm", {
            required: "This Field is required",
            validate: (value) =>
              value === getValues().password ||
              "Confirm Password must be same as your password",
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset" disabled={isSigningIn}>
          Cancel
        </Button>
        <Button disabled={isSigningIn}>Create new user</Button>
      </FormRow>
    </Form>
  );
}

export default SignupForm;
