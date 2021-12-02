//for design,
import React from 'react';
import { styled } from '@mui/material/styles';
import Backdrop from '@mui/material/Backdrop';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import MenuIcon from '@mui/icons-material/Menu';
import VoteIcon from '@mui/icons-material/HowToVote';
import HomeIcon from '@mui/icons-material/Home';
import WishlistIcon from '@mui/icons-material/AddShoppingCart';
import voteIcon from '../Icons/voteIcon.png';
//using mui
import { height } from '@mui/system';

const StyledSpeedDial = styled(SpeedDial)(({ theme }) => ({
  position: 'relative',
 
}));
const StyledSpeedDialIcon = styled(SpeedDialIcon)(({ theme }) => ({
  // icon: <FileCopyIcon/>
 
}));


const actions = [
  { icon: <div>
    <label for id="voteIcon"><voteIcon/></label> 
    <VoteIcon id="voteIcon" display='none'/></div>, name: 'Vote'},
  { icon: <HomeIcon />, name: 'Home'},
  { icon: <WishlistIcon />, name: 'Wishlist'},
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
 

  const clickVote = (e) =>{
    window.location.href="/vote/groupB/make"
  }
  const clickHome = (e) =>{
    window.location.href="/main"
  }
  const clickWishlist = (e) =>{
    window.location.href="/ourpage/bucket"
  }

  const clickHandler = (name) =>{
    switch(name){
      case 'Vote':
        return clickVote
      case 'Home':
        return clickHome
      case 'Wishlist':
        return clickWishlist
      default:
        console.log("not matched")
    }
  }

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
          FabProps={{size:"small", id:'menuIcon',style: {backgroundColor:"#C4DCDF", outlineColor:'white',outlineWidth:'4px', outlineStyle:'solid'}}} 
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
              onClick={clickHandler(action.name)}
            />
          ))}
        </StyledSpeedDial>
    </div>

  );
}