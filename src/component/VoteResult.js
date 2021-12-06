import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom'
import { Link } from "react-router-dom";
import { db } from '../firebase'
import './VoteResult.css'
import XButton from '../Icons/X.png';
import Clip from '../Icons/clip_navy.png';

import closeButton from "../Icons/CloseButtonGreen.png"


const VoteResult = ({ voteRef }) => {
    const { vid } = useParams()  
    const [voteName, setVoteName] = useState("")
    const [voteData, setVoteData] = useState(null)
    const [wishes, setWishes] = useState(null)
    const [userNum, setUserNum] = useState(0)
    const [preferenceSum, setPreferenceSum] = useState([])
    const [comments, setComments] = useState([])

    useEffect(()=>{
        voteRef.doc(vid).get().then((doc)=>{
            const vote = doc.data()
            if(vote) {
                const wishArr = vote.options.map(i => i.option)
                setWishes(wishArr)
                setVoteName(doc.data().name)
                setVoteData(vote.options)
                setUserNum(vote.options[0].indiv.length)
            }
        })
    },[])
    
    useEffect(()=>{
        if(wishes) {
            setPreferenceSum(Array(wishes.length).fill(0))
            setComments(Array(wishes.length).fill([]))
        }
    }, wishes)

    useEffect(() => {
        if(voteData) {
            var indivData = voteData.map(i => i.indiv)
            indivData.map((data, index) => {
                // sum value
                var tmpPreferenceSum = data.map(s => s.value).reduce((a, b) => a+b, 0)
                var preferenceSumArr = preferenceSum
                preferenceSumArr[index] = tmpPreferenceSum
                setPreferenceSum(preferenceSumArr)
                // collect comment
                var tmpComments = data.map(s => s.comment).filter(s => s !== "")
                var commentsArr = comments
                commentsArr[index] = tmpComments
                setComments(commentsArr)
            })
        }
    }, [voteData])

    if(!wishes) return null

    return (
        <div id="vote_box" className='vote_result_background'>
            <Link to={`/chat`} className="close-button" style={{ left: "30px", top: "30px" }}><img src={closeButton} width="100%" /></Link>
            <img src ={Clip} className='clip-ing-location'/>
            <div className='paper-result-back'/>
            <div className='paper-box'>
            {/* <img src={XButton} height='40px' className='button_location' onClick={() => window.location.href = "/chat"}/> */}
            <div className='vote-result-title'> {voteName} Results</div>
            {wishes.map((wish, i)=>{
                return (
                    <div className='number-container'>
                        <div className='wish'>{wish}</div> <br/>
                        <div className='number' style={{"--width":preferenceSum[i]/userNum/100}}></div>
                        {/* <span className='block'/> */}
                        <div className='total-point'>{preferenceSum[i]}</div>  
                        <br/>
                        {comments[i] && comments[i].map(comment => {
                            return (
                                <div className='anonymous_comment_box'>
                                    <span className='comment-text'>Anonymous comment:</span>
                                    <span className='comment-text-contents'>{comment}</span>
                                </div>
                            )
                        })}
                    </div>
                )
            })}
            <div style={{ height: "50px" }}></div>
        </div>
        </div>
    );
};

export default VoteResult