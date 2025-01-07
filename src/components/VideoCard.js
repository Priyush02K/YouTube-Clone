import React from 'react'

const VideoCard = ({info}) => {
    console.log(info);
    // const { snippet, statistics } = info;
    //  const { channelTitle, title, thumbnails } = snippet;

     const { snippet, statistics } = info || {};
     const { channelTitle, title, thumbnails } = snippet || {};

     
  return (
    <div className="p-2 m-2 w-72 shadow-lg">
        <img src={thumbnails?.medium?.url} alt="thumbnails" className="rounded-lg"/>
        <ul>
            <li className="font-bold py-2">{title || "No Title Available"}</li>
            <li>{channelTitle}</li>
            <li>{statistics?.viewCount}  views</li>

        </ul>
      
    </div>
  )
}

export default VideoCard;


// const VideoCard = ({ info }) => {
//   if (!info) {
//     return null; // Render nothing if `info` is undefined
//   }

  // const { snippet, statistics } = info || {};
  // const { channelTitle, title, thumbnails } = snippet || {};

//   return (
//     <div className="p-2 m-2 w-72 shadow-lg">
//       {thumbnails?.medium?.url && (
//         <img
//           src={thumbnails.medium.url}
//           alt="thumbnails"
//           className="rounded-lg"
//         />
//       )}
//       <ul>
//         <li className="font-bold py-2">{title || "No Title Available"}</li>
//         <li>{channelTitle || "No Channel Title"}</li>
//         <li>
//           {statistics?.viewCount
//             ? `${statistics.viewCount} views`
//             : "No View Count"}
//         </li>
//       </ul>
//     </div>
//   );
// };

// export default VideoCard;
