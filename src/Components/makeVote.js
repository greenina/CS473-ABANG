import React, { useEffect } from "react";
import {useState} from 'react'; 
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import {db} from '../firebase'
import { arrayUnion, updateDoc } from "firebase/firestore";

const makeVote = (props)=>{

    return(
        <FormGroup>
            <FormControlLabel 
                control=
                {<Checkbox/>} 
                label="aaa" />
        </FormGroup>
    )

}

export default makeVote;