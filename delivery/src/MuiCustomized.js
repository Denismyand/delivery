import { createTheme, styled } from "@mui/material/styles";
import { Button, TextField } from "@mui/material";

function Capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

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
  typography: { fontSize: 18 },
});

export const quantityInput = createTheme({
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          sx: {
            height: "60px",
            textAlign: "center",
            fontSize: "40px",
            borderRadius: "0px",
          },
        },
      },
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
        bottom: "13px",
        right: "13px",
        fontSize: "20px",
        textTransform: "none",
      }}
      variant="contained"
      color="primary"
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

export function ButtonSubmitOrder({ disabled, onClick, children }) {
  return (
    <Button
      sx={{
        height: "60px",
        width: "300px",
        position: "absolute",
        bottom: "0",
        right: "0",
        fontSize: "20px",
        textTransform: "none",
        borderRadius: "10px",
      }}
      variant="contained"
      color="primary"
      disabled={disabled}
      onClick={onClick}
    >
      <b>{children}</b>
    </Button>
  );
}

export function ButtonArrowUp({ onClick }) {
  return (
    <Button
      sx={{
        height: "30px",
        width: "30px",
        fontSize: "20px",
        textTransform: "none",
        borderRadius: "0px",
        borderTopRightRadius: "10px",
        padding: "0px",
        minWidth: "30px",
      }}
      variant="contained"
      color="primary"
      onClick={onClick}
    >
      <b>▲</b>
    </Button>
  );
}
export function ButtonArrowDown({ onClick }) {
  return (
    <Button
      sx={{
        height: "30px",
        width: "30px",
        fontSize: "20px",
        textTransform: "none",
        borderRadius: "0px",
        borderBottomRightRadius: "10px",
        padding: "0px",
        minWidth: "30px",
      }}
      variant="contained"
      color="primary"
      onClick={onClick}
    >
      <b>▼</b>
    </Button>
  );
}

export function InputPersonalInfo({ toInput, value, onChange, disabled }) {
  return (
    <TextField
      sx={{ width: "600px" }}
      variant="outlined"
      color="primary"
      label={Capitalize(toInput) + ":"}
      placeholder={`Enter your ${toInput}`}
      value={value}
      onChange={onChange}
      disabled={disabled}
    ></TextField>
  );
}

const QuantityInput = styled(TextField)(() => ({
  "& fieldset": {
    borderRadius: "0px",
    borderTopLeftRadius: "10px",
    borderBottomLeftRadius: "10px",
  },
}));

export function InputCartQuantity({ value, onChange }) {
  return (
    <QuantityInput
      type="number"
      color="primary"
      value={value}
      onChange={onChange}
      inputProps={{
        style: {
          fontSize: 30,
          boxSizing: "border-box",
          width: "250px",
          height: "60px",
          textAlign: "center",
          maxLength: 2,
        },
      }}
    />
  );
}