import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../../firebase';
import HashList from './HashList';

const Hash = () => {
    const { group } = useParams()
    const [hashtags, setHashtags] = useState(null)

    useEffect(() => {
        db.collection('group').doc(group).get().then(s => {
            setHashtags(s.data().hash)
        })
    }, [])

    if(!hashtags) return null

    return (
        <div>
          <HashList data={hashtags} />
        </div>
    );
}

export default Hash;