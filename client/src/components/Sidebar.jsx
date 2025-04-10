import React, { useEffect, useState } from "react";
import { HiOutlineChat, HiOutlinePlus, HiOutlineX, HiOutlineMenu } from "react-icons/hi";
import { Link } from "react-router-dom";
import { getAllChats } from "../services/apis/Chat";

const Sidebar = () => {
  const [chats, setChats] = useState([]);
  const [isOpen, setIsOpen] = useState(false); // State for mobile toggle

  useEffect(() => {
    (async () => {
      const response = await getAllChats();
      if (response.success) {
        setChats(response.userChats.chats);
      }
    })();
  }, []);

  // Toggle sidebar visibility on mobile
  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <div>
      {/* Mobile Menu Button */}
      <button
        onClick={toggleSidebar}
        className="fixed top-20 left-4 z-50 md:hidden p-2 bg-blue-600 text-white rounded-full shadow-lg focus:outline-none hover:bg-blue-700 transition-colors duration-200"
      >
        {isOpen ? <HiOutlineX size={24} /> : <HiOutlineMenu size={24} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 w-72 bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900 text-white transform transition-transform duration-300 ease-in-out z-40
          ${isOpen ? "translate-x-0 shadow-xl" : "-translate-x-full"} 
          md:static md:w-64 md:h-full md:translate-x-0 md:shadow-none md:border-r md:border-gray-700/50`}
      >
        <div className="p-6 flex flex-col h-full">
          {/* New Chat Button */}
          <div className="mb-8">
            <Link
              to={"/pixelchat/"}
              className="w-full flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 px-4 rounded-xl hover:from-blue-600 hover:to-purple-600 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1 text-sm md:text-base"
              onClick={() => setIsOpen(false)} // Close sidebar on click in mobile
            >
              <HiOutlinePlus className="mr-2 text-xl" /> New Chat
            </Link>
          </div>

          {/* Recent Chats */}
          <h3 className="text-lg font-semibold mb-4 text-gray-200">Recent Chats</h3>
          <ul className="space-y-3 overflow-y-auto custom-scrollbar flex-1">
            {chats.length > 0 ? (
              chats.map((chat, idx) => (
                <li key={idx}>
                  <Link
                    to={`/pixelchat/${chat._id}`}
                    className="flex items-center p-3 rounded-xl hover:bg-gray-700/50 transition-all duration-300 cursor-pointer shadow-sm hover:shadow-md border border-gray-700/30 group text-sm md:text-base"
                    onClick={() => setIsOpen(false)} // Close sidebar on click in mobile
                  >
                    <HiOutlineChat className="mr-3 text-blue-400 text-xl group-hover:text-blue-300 transition-colors flex-shrink-0" />
                    <p className="truncate text-gray-200 group-hover:text-white">{chat.title}</p>
                  </Link>
                </li>
              ))
            ) : (
              <p className="text-gray-400 italic text-sm">No recent chats yet</p>
            )}
          </ul>
        </div>
      </aside>

      {/* Overlay for mobile when sidebar is open */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
    </div>
  );
};

export default Sidebar;

/* Custom Scrollbar Styling */
const styles = `
  .custom-scrollbar::-webkit-scrollbar {
    width: 6px;
  }
  .custom-scrollbar::-webkit-scrollbar-track {
    background: transparent;
  }
  .custom-scrollbar::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.2);
    border-radius: 3px;
  }
  .custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: rgba(255, 255, 255, 0.3);
  }
`;

