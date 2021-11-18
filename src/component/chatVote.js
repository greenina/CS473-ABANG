import { WindowRounded } from '@mui/icons-material';
import React, { useState } from 'react';

const chatVote = (props) =>{
    console.log("PROPS",props)

    const goVote = () =>{
        window.location.href="/vote/groupB/"+props.index.toString()
    }
    return(
        <div>
            <div>{props.name}</div>
            <button onClick={goVote}>GO TO VOTE~!</button>
        </div>
    )
}

export default chatVote;