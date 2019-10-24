import React from 'react';
import { NavLink } from 'react-router-dom';


const SongList = props => {
    let {songs} = props;
    console.log(songs);
    
    songs = songs.map(song => {
        
        const {id, full_title, header_image_thumbnail_url, url} = song.result;
        console.log(id);
        return (
            <li key = {id}>
                <h1>{full_title}</h1>
                <img  alt = '' src = {header_image_thumbnail_url} />
                <NavLink to = {{
                pathname : `analysis/${id}`,
                state : {url : url} 
            }}>View Analyis of this Song</NavLink>
            </li>
        )
    })
    return (
        <div>
            <ul>
                {songs}
            </ul>
        </div>
    );
};

export default SongList;