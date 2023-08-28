// mui 5
import TextField, { TextFieldProps } from "@mui/material/TextField";
// react-hook-form
import { useFormContext } from "react-hook-form";

type Props = { name: string } & TextFieldProps;

export function TextFieldCustom({ name, ...props }: Props) {
  // react-hook-form
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const helperText = errors[name] ? errors[name]?.message : "";

  return (
    <TextField
      error={!!errors[name]}
      helperText={helperText as string}
      {...register(name)}
      {...props}
      fullWidth
    />
  );
}
