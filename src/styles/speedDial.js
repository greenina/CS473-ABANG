//for design,
import React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Switch from '@mui/material/Switch';
import Backdrop from '@mui/material/Backdrop';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
import SaveIcon from '@mui/icons-material/Save';
import PrintIcon from '@mui/icons-material/Print';
import ShareIcon from '@mui/icons-material/Share';
import MenuIcon from '@mui/icons-material/Menu';
import VoteIcon from '@mui/icons-material/HowToVote';
import HomeIcon from '@mui/icons-material/Home';
import WishlistIcon from '@mui/icons-material/AddShoppingCart';
//using mui

const StyledSpeedDial = styled(SpeedDial)(({ theme }) => ({
  position: 'relative',
 
}));
const StyledSpeedDialIcon = styled(SpeedDialIcon)(({ theme }) => ({
  // icon: <FileCopyIcon/>
 
}));

const actions = [
  { icon: <VoteIcon />, name: 'Vote' },
  { icon: <HomeIcon />, name: 'Home' },
  { icon: <WishlistIcon />, name: 'Wishlist' },
];

export default function PlaygroundSpeedDial() {
  const [direction, setDirection] = React.useState('up');
  const [hidden, setHidden] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleDirectionChange = (event) => {
    setDirection(event.target.value);
  };

  const handleHiddenChange = (event) => {
    setHidden(event.target.checked);
  };

  return (
    <div sx={{ height: 330, transform: 'translateZ(0px)', flexGrow: 1 }}>
      <Backdrop open={open} />
      <StyledSpeedDial
          ariaLabel="SpeedDial playground example"
          //sx={{ position: 'absolute', bottom: 16, right: 16 }}
          onClose={handleClose}
          onOpen={handleOpen}
          open={open}
          hidden={hidden}
          icon={<StyledSpeedDialIcon icon={<MenuIcon/>} openIcon={<MenuIcon/>}/>} 
          FabProps={{size:"small", style: {backgroundColor:"red"}}} 
          direction={"down"}
          style={{padding:0, margin:0}}
        >
          {actions.map((action) => (
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
              style={{margin:0}}
              tooltipOpen
              onClick={handleClose}
            />
          ))}
        </StyledSpeedDial>
    </div>

  );
}