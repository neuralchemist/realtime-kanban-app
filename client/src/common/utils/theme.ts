import { blue, green } from "@mui/material/colors";

const colors = {
  green: {
    500: "#4cceac",
  },
  black: {
    500: "#141b2d",
  },
  grey: {
    500: "#666666",
  },
};

export const darkTheme = {
  primary: {
    main: colors.black["500"],
  },
  secondary: {
    main: green[900],
  },
  neutral: {
    main: colors.grey["500"],
  },
  // background: {
  //   default: colors.black['500'],
  // },
  text: {
    primary: colors.green["500"],
    secondary: colors.grey["500"],
  },
};

export const ligtTheme = {
  primary: {
    main: blue[800],
  },
};
