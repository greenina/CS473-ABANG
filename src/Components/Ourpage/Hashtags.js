import React, { useState, useEffect } from 'react';
import { db } from '../../firebase';
import HashForm from './HashForm';
import HashList from './HashList';

const Hash = () => {
    const [hashtags, setHashtags] = useState(null)

    useEffect(() => {
        db.collection('group').doc('groupB').get().then(s => {
            setHashtags(s.data().hash)
        })
    }, [])

    const handleCreate = (data) => {
        setHashtags([...hashtags, data])
    };

    const handleRemove = (id) => {
        console.log(id)
        setHashtags(hashtags.filter((data, index) => id !== index));
        window.location.href = "/ourpage"
    };

    if(!hashtags) return null

    return (
        <div>
          <HashList data={hashtags} onRemove={handleRemove} />
          <HashForm onCreate={handleCreate} />
        </div>
    );
}

export default Hash;