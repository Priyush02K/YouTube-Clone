import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ChatMessage from "./ChatMessage";
import { addMessage } from "../utils/chatSlice";
import { generateRandomName, makeRandomMessage } from "../utils/helper";

const LiveChart = () => {
  const [liveMessage, setLiveMessage] = useState("");
  const dispatch = useDispatch();

  const chatMessages = useSelector((store) => store.chat.messages);

  useEffect(() => {
    const i = setInterval(() => {
      // API Polling
      dispatch(
        addMessage({
          name: generateRandomName(),
          message: makeRandomMessage(20) ,
        })
      );
    }, 2000);

    return () => clearInterval(i);
  }, [dispatch]); // Include dispatch in the dependency array

  return (
    <div className="flex flex-col-reverse w-[350px] h-[500px] ml-4 p-2 border border-black bg-slate-100 rounded-lg overflow-y-scroll">
      {/* Input form */}
      <form
        className="flex p-2 mt-2 border-t border-gray-300"
        onSubmit={(e) => {
          e.preventDefault();
          if (liveMessage.trim()) {
            dispatch(
              addMessage({
                name: "Priyush Khobragade",
                message: liveMessage,
              })
            );
            setLiveMessage("");
          }
        }}
      >
        <input
          className="flex-grow p-2 border border-gray-300 rounded"
          type="text"
          placeholder="Type your message..."
          value={liveMessage}
          onChange={(e) => setLiveMessage(e.target.value)}
        />
        <button className="ml-2 px-4 bg-green-100 rounded">Send</button>
      </form>

      {/* Chat messages */}
      <div className="flex-grow">
        {chatMessages.map((c, i) => (
          <ChatMessage key={i} name={c.name} message={c.message} />
        ))}
      </div>
    </div>
  );
};

export default LiveChart;
