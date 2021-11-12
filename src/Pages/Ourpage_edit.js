import React, {Component} from 'react';
import {useRouter} from 'next/router';
import {Route,Link} from 'react-router-dom';
import GroupName from '../component/groupname';
import Introduce from '../component/introduce';

class Ourpage_Edit extends Component {
    render(){
        return(
            <div>
                <h2>Ourpage</h2>
                <h6>Group Name</h6>
                <div><GroupName/></div>
                <br/>
                <h6>Introduce our group</h6>
                <div><Introduce/></div>
                <br/>
                <br/>
                <br/>
                <Link to = "../ourpage"><button>Done </button></Link>
                
            </div>
        )
    }
}
export default Ourpage_Edit