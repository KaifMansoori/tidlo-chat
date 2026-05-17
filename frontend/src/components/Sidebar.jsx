import { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import SidebarSkeleton from "./skeletons/SidebarSkeleton";
import { Users } from "lucide-react";
import FriendManager from "./FriendManager";

const Sidebar = () => {
  const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } = useChatStore();

  const { onlineUsers } = useAuthStore();
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);
  const [activeTab, setActiveTab] = useState("chats");

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const filteredUsers = showOnlineOnly
    ? users.filter((user) => onlineUsers.includes(user._id))
    : users;

  if (isUsersLoading) return <SidebarSkeleton />;

  return (
    <aside className="h-full w-20 lg:w-[320px] border-r border-base-content/5 flex flex-col transition-all duration-200 bg-base-100/30 backdrop-blur-md">
      <div className="w-full p-5 space-y-4">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-2">
            <Users className="size-6 text-primary" />
            <span className="font-bold text-xl hidden lg:block tracking-tight">Messages</span>
          </div>
        </div>

        {/* Segmented Control */}
        <div className="hidden lg:flex p-1 bg-base-200/50 rounded-full w-full relative backdrop-blur-sm border border-base-content/5">
          <div
            className={`absolute top-1 bottom-1 w-[calc(50%-4px)] bg-base-100 rounded-full shadow-sm transition-all duration-300 ease-out
            ${activeTab === "chats" ? "left-1" : "left-[calc(50%+2px)]"}`}
          />
          <button
            onClick={() => setActiveTab("chats")}
            className={`flex-1 relative z-10 py-1.5 text-sm font-medium transition-colors rounded-full
              ${activeTab === "chats" ? "text-base-content" : "text-base-content/50 hover:text-base-content/80"}`}
          >
            Chats
          </button>
          <button
            onClick={() => setActiveTab("friends")}
            className={`flex-1 relative z-10 py-1.5 text-sm font-medium transition-colors rounded-full
              ${activeTab === "friends" ? "text-base-content" : "text-base-content/50 hover:text-base-content/80"}`}
          >
            Friends
          </button>
        </div>

        {/* Online filter toggle */}
        {activeTab === "chats" && (
          <div className="hidden lg:flex items-center gap-2 px-1">
            <label className="cursor-pointer flex items-center gap-2">
              <input
                type="checkbox"
                checked={showOnlineOnly}
                onChange={(e) => setShowOnlineOnly(e.target.checked)}
                className="checkbox checkbox-xs rounded-full"
              />
              <span className="text-sm font-medium text-base-content/70">Show online only</span>
            </label>
            <span className="text-[10px] font-bold bg-primary/10 text-primary px-2 py-0.5 rounded-full ml-auto uppercase tracking-wider">
              {onlineUsers.length - 1 > 0 ? onlineUsers.length - 1 : 0} online
            </span>
          </div>
        )}
      </div>

      <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-base-content/10 to-transparent" />

      {activeTab === "friends" ? (
        <FriendManager />
      ) : (
        <div className="overflow-y-auto w-full p-3 space-y-1">
          {filteredUsers.map((user) => (
            <button
              key={user._id}
              onClick={() => setSelectedUser(user)}
              className={`
                w-full p-3 flex items-center gap-4 rounded-2xl
                transition-all duration-200 group
                ${
                  selectedUser?._id === user._id
                    ? "bg-primary text-primary-content shadow-md shadow-primary/20 scale-[1.02]"
                    : "hover:bg-base-200/50 hover:scale-[1.01]"
                }
              `}
            >
              <div className="relative mx-auto lg:mx-0 shrink-0">
                <img
                  src={user.profilePic || "/avatar.png"}
                  alt={user.fullName}
                  className="size-12 object-cover rounded-full shadow-sm ring-2 ring-transparent group-hover:ring-base-100 transition-all"
                />
                {onlineUsers.includes(user._id) && (
                  <span
                    className="absolute bottom-0 right-0 size-3.5 bg-emerald-500 
                    rounded-full ring-2 ring-white shadow-sm"
                  />
                )}
              </div>

              {/* User info - only visible on larger screens */}
              <div className="hidden lg:block text-left min-w-0 flex-1">
                <div className="font-semibold truncate text-[15px]">{user.fullName}</div>
                <div
                  className={`text-sm truncate ${
                    selectedUser?._id === user._id ? "text-primary-content/80" : "text-base-content/60"
                  }`}
                >
                  {onlineUsers.includes(user._id) ? "Online now" : "Offline"}
                </div>
              </div>
            </button>
          ))}

          {filteredUsers.length === 0 && (
            <div className="text-center text-base-content/50 py-10 px-4">
              <p className="font-medium text-sm">No friends found</p>
            </div>
          )}
        </div>
      )}
    </aside>
  );
};
export default Sidebar;
