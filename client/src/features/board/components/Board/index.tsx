// custom
import { StyledBoard } from "./styles";
import { ProjectSection } from "../ProjectSection";
// custom types
import { TaskSection } from "..";

export function Board() {
  return (
    <StyledBoard aria-label="board">
      <ProjectSection />
      <TaskSection />
    </StyledBoard>
  );
}
