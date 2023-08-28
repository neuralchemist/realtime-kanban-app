// react-router-dom
import { useNavigate } from "react-router-dom";
// mui 5
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
// custom types
import { IProject } from "src/entities/project/types";

interface Props {
  projectId: IProject["_id"];
  title: IProject["title"];
  // icon: React.ReactNode;
}

export function ProjectItem({ projectId, title }: Props) {
  // react-router-dom logic
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`projects/${projectId}`);
  };

  return (
    <ListItem aria-label="project-item" disablePadding>
      <ListItemButton onClick={handleClick}>
        <ListItemIcon
          sx={{
            // border: "1px solid white",
            display: "flex",
            justifyContent: "flex-end",
            paddingRight: 1,
          }}
        >
          🐸
        </ListItemIcon>
        <ListItemText primary={title} />
      </ListItemButton>
    </ListItem>
  );
}
