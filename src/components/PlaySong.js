import React from "react";
import AudioPlayer from "react-h5-audio-player";
import 'react-h5-audio-player/lib/styles.css';

const PlaySong = ({ url }) => {
    return (
        <div style={{
            marginTop: '2rem',
            width: "100%",
        }}>
            <AudioPlayer
                style={{ paddingLeft: "100px", paddingRight: "100px" }}
                autoPlay
                src={url}
                onPlay={e => console.log("onPlay")}
            />
        </div>
    )
}

export default PlaySong;