// mui 5
import Typography from "@mui/material/Typography";

interface Props {
  message: string;
}

export function ErrorMessage({ message = "" }: Props) {
  return (
    <Typography
      marginY={1}
      variant="subtitle2"
      color="error"
      textAlign="center"
    >
      {message}
    </Typography>
  );
}