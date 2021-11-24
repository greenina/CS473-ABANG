import React, {Component} from 'react';
import {useRouter} from 'next/router';
import {Route,Link} from 'react-router-dom';
import GroupName from '../component/groupname';
import Introduce from '../component/introduce';
import DisplayImage from '../Components/Ourpage/DisplayImage';
import NavBar from '../Components/Main/NavBar';
import Hashtags from "../Components/Ourpage/Hashtags";
import BucketList from '../component/BucketList'

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
                <Link to = "../ourpage"><button> Done </button></Link>

                <div className="ourpage">

            <div className="ourpage-container">
                <DisplayImage/>
                <br/>
                <div className="info-container">
                    <div className="group-introduction">
                        <div onClick={() => window.location.href = "/ourpage/bucket"} className="bucket-button">See Bucket List &nbsp;<img src={bucketlistIcon} width={20} /></div>
                        <div className="header">Introduce Us</div>
                        </div>
                    
                        <Hashtags/>
                    </div>
                    <div className="bucket-container">
                        <BucketList show={true} />
                    </div>
                </div>
            </div>
            <NavBar />
        </div>


        )
    }
}
export default Ourpage_Edit