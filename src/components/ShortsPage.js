import React, { useEffect ,useState } from "react";

const ShortsPage = () => {
  const [shortsData, setShortsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const apiKey = "AIzaSyBUukp7SN6RO0MrFo4SC1wpHdYG9IBxCRY"; // Replace with your environment variable

  useEffect(() => {
    const fetchShortsData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&type=video&videoDuration=short&key=${apiKey}`
        );
        if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
        const data = await response.json();
        setShortsData(data.items || []);
      } catch (error) {
        console.error("Error fetching Shorts data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchShortsData();
  }, [apiKey]);

  const ShortCard = ({ short }) => (
    <div className="relative w-full h-screen flex flex-col justify-center items-center bg-black">
      <img
        src={short.snippet.thumbnails.high.url}
        alt={short.snippet.title}
        className="w-full h-full object-cover"
      />
      <div className="absolute bottom-0 w-full p-4 bg-gradient-to-t from-black via-transparent to-transparent">
        <h3 className="text-white text-lg font-bold truncate">
          {short.snippet.title}
        </h3>
        <p className="text-gray-300 text-sm">{short.snippet.channelTitle}</p>
      </div>
    </div>
  );

  return (
    <div className="w-full h-screen overflow-y-scroll snap-y snap-mandatory">
      {loading ? (
        <div className="flex items-center justify-center h-screen text-white">
          Loading Shorts...
        </div>
      ) : (
        shortsData.map((short) => (
          <div key={short.id.videoId} className="snap-center">
            <ShortCard short={short} />
          </div>
        ))
      )}
    </div>
  );
};

export default ShortsPage;
