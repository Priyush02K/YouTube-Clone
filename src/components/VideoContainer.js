import React, { useEffect, useState } from "react";
import { YOUTUBE_VIDEOS_API } from "../utils/contants";
import VideoCard from "./VideoCard";
// import VideoCard, { AdVideoCard } from "./VideoCard";
// import { Link } from "react-router-dom";

const VideoContainer = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    getVideos();
  }, []);

  const getVideos = async () => {
    const data = await fetch(YOUTUBE_VIDEOS_API);
    const json = await data.json();
    console.log(json);
    setVideos(json.items);
  };

  return (
    <div className="flex flex-wrap">
  
  
       <VideoCard  info={videos[0]}/>
       <VideoCard  info={videos[1]}/>
       <VideoCard  info={videos[2]}/>
       <VideoCard  info={videos[3]}/>
       <VideoCard  info={videos[4]}/>
    </div>
  );
};

export default VideoContainer;
