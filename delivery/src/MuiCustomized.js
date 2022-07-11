import { createTheme } from "@mui/material/styles";
import { Button } from "@mui/material";
import { positions } from "@mui/system";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#607d8b",
      light: "#90a4ae",
      dark: "#455a64",
      contrastText: "#000000",
    },
    secondary: {
      main: "#212121",
      light: "#757575",
      dark: "#000000",
      contrastText: "#FFFFFF",
    },
  },
});

export function ButtonRestaurant({ disabled, onClick, children }) {
  return (
    <Button
      sx={{
        height: "100px",
        width: "300px",
        fontSize: "20px",
        textTransform: "none",
      }}
      variant="contained"
      color="primary"
      size="large"
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </Button>
  );
}

export function ButtonMenu({ onClick, children }) {
  return (
    <Button
      sx={{
        height: "50px",
        width: "50%",
        position: "absolute",
        bottom: "10px",
        right: "10px",
        fontSize: "20px",
        textTransform: "none",
      }}
      variant="contained"
      color="primary"
      size="large"
      onClick={onClick}
    >
      {children}
    </Button>
  );
}

export function ButtonClearCart({ disabled, onClick, children }) {
  return (
    <Button
      sx={{
        height: "100px",
        width: "300px",
        fontSize: "20px",
        textTransform: "none",
      }}
      variant="contained"
      color="error"
      size="large"
      disabled={disabled}
      onClick={onClick}
    >
      <b> {children}</b>
    </Button>
  );
}
export function ButtonFooter({ children }) {
  return (
    <Button
      sx={{
        height: "60px",
        width: "200px",
        fontSize: "20px",
        textTransform: "none",
      }}
      variant="outlined"
      color="secondary"
    >
      {children}
    </Button>
  );
}

