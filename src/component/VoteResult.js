import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom'
import { db } from '../firebase'

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
        <div id="vote_box">
            <button onClick={() => window.location.href = "/chat"}>Close Button</button>
            <div>{voteName} Results~~~</div>
            {wishes.map((wish, i)=>{
                return (
                    <div>
                        <b>{wish}</b> <br/>
                        이 수치를 가지고 이쁘게 bar로 꾸며주자 {preferenceSum[i]}/{userNum*100} <br/>
                        {comments[i] && comments[i].map(comment => {
                            return (
                                <div>익명의 코멘트~~ : {comment}</div>
                            )
                        })}
                    </div>
                )
            })}
        </div>
    );
};

export default VoteResult