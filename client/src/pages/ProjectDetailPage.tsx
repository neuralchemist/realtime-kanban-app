import Box from "@mui/material/Box";
import { Board } from "@features/board/components";

export function ProjectDetailPage() {
  return (
    <Box
      sx={{
        maxWidth: "1000px",
      }}
    >
      <Board />
    </Box>
  );
}
