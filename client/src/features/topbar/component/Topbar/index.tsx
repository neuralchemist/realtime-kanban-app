
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { StyledAppbar } from './styles';


interface Props {
	open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}


export function Topbar({open, setOpen}: Props) {

	const handleDrawerOpen = () => {
		setOpen(true)
	}

  return (
      <StyledAppbar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </StyledAppbar>
  );
}