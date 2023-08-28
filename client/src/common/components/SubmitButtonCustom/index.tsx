// mui5
import Button, { ButtonProps } from "@mui/material/Button";

interface Props extends ButtonProps {
  label: string;
  isDisabled: boolean;
}

export function SubmitButtonCustom({ label, isDisabled, ...props }: Props) {
  return (
    <Button type="submit" disabled={isDisabled} {...props}>
      {label}
    </Button>
  );
}
