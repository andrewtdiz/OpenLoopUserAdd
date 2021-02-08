import React, {useEffect, useState} from 'react'

const CAT_API = 'https://api.thecatapi.com/v1/images/search?mime_types=gif';

export default function CatDisplay() {
    const [catImageURL, setCatImageURL] = useState();

    useEffect(() => {
        fetch(CAT_API)
            .then(res => res.json())
            .then(data => {
                const {url} = data[data.length-1]
                setCatImageURL(url)
            })
            .catch(console.error);
    }, [])

    return (
        <div>
            <img src={catImageURL} className="w-36 h-36" alt=""/>
        </div>
    )
}
