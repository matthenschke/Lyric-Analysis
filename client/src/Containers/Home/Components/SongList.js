import React from 'react';
import { NavLink } from 'react-router-dom';


const SongList = props => {
    let {songs} = props;
    console.log(songs);
    
    songs = songs.map(song => {
        
        const {id, full_title, header_image_thumbnail_url, url} = song.result;
        console.log(id);
        return (
            <li key = {id} className = "song container">
                <h1 className = "song-title">{full_title}</h1>
                <img  className = "song-img text-center" alt = '' src = {header_image_thumbnail_url} />
                <NavLink className= "song-btn btn btn-primary btn-large" to = {{
                pathname : `analysis/${id}`,
                state : {url : url} 
            }}>View Analyis of this Song</NavLink>
            </li>
        )
    })
    return (
        <div id = "song-list" className = "text-left">
            <ul>
                {songs}
            </ul>
        </div>
    );
};

export default SongList;