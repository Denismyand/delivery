import { Button } from "@mui/material";

export function ButtonRestaurant({ variant, color, size, disabled, onClick, children }) {
  return (
    <Button
      sx={{ height: "100px", width: "300px" }}
      variant={variant}
      color={color}
      size={size}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </Button>
  );
}
