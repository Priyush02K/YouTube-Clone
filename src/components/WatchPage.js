// import React, { useEffect } from 'react'
// import { useDispatch } from "react-redux";
// import { closeMenu } from '../utils/appSlice';
// import { useSearchParams } from "react-router-dom";

// const WatchPage = () => {
//   const [searchParams] = useSearchParams();

//   const dispatch=useDispatch();
//   useEffect (()=>{
//     dispatch(closeMenu())
//   },[])
  
  
  
//   return (
//     <div className="flex flex-col w-full">
//       <div className="px-5 flex w-full">
//         <div className="">
//           <iframe
//             width="1000"
//             height="500"
//             src={"https://www.youtube.com/embed/" + searchParams.get("v")}
//             title="YouTube video player"
//             frameBorder="0"
//             allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
//             allowFullScreen
            
//           ></iframe>
//         </div>
//         {/* <div className="w-full">
//           <LiveChat />
//         </div> */}
//       </div>
//       {/* <CommentsContainer /> */}
//     </div>
//   );

// };

// export default WatchPage;
//AIzaSyBUukp7SN6RO0MrFo4SC1wpHdYG9IBxCRY

//2nd way
import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch } from "react-redux";
import { closeMenu } from '../utils/appSlice';
import { useSearchParams } from "react-router-dom";
import YouTube from 'react-youtube';
import CommentsContainer from './CommentsContainer';
import LiveChat from './LiveChat';

const WatchPage = () => {
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const videoId = useMemo(() => searchParams.get("v"), [searchParams]);
  const [videoData, setVideoData] = useState(null);
  const [suggestedVideos, setSuggestedVideos] = useState([]);
  const [loading, setLoading] = useState({ video: true, suggestions: true });
  const [descriptionExpanded, setDescriptionExpanded] = useState(false);
  const apiKey = "AIzaSyBUukp7SN6RO0MrFo4SC1wpHdYG9IBxCRY" // Environment variable for API key

  useEffect(() => {
    const fetchVideoData = async () => {
      setLoading((prev) => ({ ...prev, video: true }));
      try {
        const response = await fetch(
          `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${videoId}&key=${apiKey}`
        );
        if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
        const data = await response.json();
        if (data.items?.length > 0) {
          setVideoData(data.items[0]);
          fetchSuggestedVideos(data.items[0].snippet.channelId);
        } else {
          console.error("No video data found for this ID.");
        }
      } catch (error) {
        console.error("Error fetching video data:", error);
      } finally {
        setLoading((prev) => ({ ...prev, video: false }));
      }
    };

    const fetchSuggestedVideos = async (channelId) => {
      setLoading((prev) => ({ ...prev, suggestions: true }));
      try {
        const response = await fetch(
          `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&maxResults=5&type=video&key=${apiKey}`
        );
        if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
        const data = await response.json();
        setSuggestedVideos(data.items || []);
      } catch (error) {
        console.error("Error fetching suggested videos:", error);
      } finally {
        setLoading((prev) => ({ ...prev, suggestions: false }));
      }
    };

    if (videoId) fetchVideoData();
  }, [videoId, apiKey]);

  useEffect(() => {
    dispatch(closeMenu());
  }, [dispatch]);

  const VideoCard = ({ video }) => (
    <a href={`/watch?v=${video.id.videoId}`} className="block">
      <div className="rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
        <img
          src={video.snippet.thumbnails.medium.url}
          alt={video.snippet.title}
          className="w-full h-auto"
        />
        <div className="p-4 bg-white">
          <h3 className="text-sm font-medium truncate">{video.snippet.title}</h3>
          <p className="text-xs text-gray-600 mt-1">{video.snippet.channelTitle}</p>
        </div>
      </div>
    </a>
  );

  return (
    <><div className="flex flex-col  px-3 py-4">
      <div className="w-full max-w-5xl mx-auto">

        {/* Video Player */}
        <div className="mb-6">
          {loading.video ? (
            <div className="text-center text-gray-500">Loading video...</div>
          ) : (
            <YouTube videoId={videoId} opts={{ width: '100%', height: '500' }} />
          )}
        </div>


        {/* --------- */}

        {/* Video Details */}
        {videoData && (
          <div className="mb-8 ">
            <h1 className="text-2xl font-bold mb-4">{videoData.snippet.title}</h1>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
              <div className="flex items-center space-x-4">
                <button className="text-gray-800 font-medium bg-gray-200 p-4 rounded-lg">{videoData.snippet.channelTitle}</button>
                <span className="text-gray-500">{videoData.statistics?.viewCount} views</span>
              </div>
              <button className="px-6 py-2 bg-red-500 text-white font-bold rounded-lg shadow-md hover:bg-red-600 transition">
                Subscribe
              </button>
            </div>

            {/* Collapsible Description */}
            <div className="relative bg-gray-100 p-4 rounded-lg shadow-md">
              <p
                className={`text-gray-800 ${descriptionExpanded ? "" : "line-clamp-3"} transition-all`}
              >
                {videoData.snippet.description}
              </p>
              <button
                className="mt-2 text-blue-500 hover:underline text-sm font-medium"
                onClick={() => setDescriptionExpanded(!descriptionExpanded)}
              >
                {descriptionExpanded ? "Show Less" : "Show More"}
              </button>
            </div>
          </div>
        )}

        <div>
          <CommentsContainer />
        </div>

        {/* Suggested Videos */}
        {loading.suggestions ? (
          <div className="text-center text-gray-500">Loading suggestions...</div>
        ) : suggestedVideos.length > 0 ? (
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Suggested Videos</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {suggestedVideos.map((video) => (
                <VideoCard key={video.id.videoId} video={video} />
              ))}
            </div>
          </div>
        ) : (
          <div className="text-gray-500">No suggested videos found.</div>
        )}
      </div>


    </div>
    <div>
        <div className="flex flex-row-reverse px-3 py-4"> <LiveChat /></div>

      </div>


      </>

    
  );
};

export default WatchPage;
