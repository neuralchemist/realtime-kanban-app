// mui
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export function EmptyProjectPage() {
  return (
    <Box
      sx={{
        maxWidth: "1200px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: '100%',
        height: '100vh',
        // ---DEBUG---
        // border: '1px solid white'
      }}
    >
      <Typography variant="h6">No Project selected</Typography>
    </Box>
  );
}
