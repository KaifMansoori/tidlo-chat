import { useState, useEffect } from "react";
import { useFriendStore } from "../store/useFriendStore";
import { Search, UserPlus, Check, X, Loader2 } from "lucide-react";

const FriendManager = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const {
    searchUsers,
    searchResult,
    isSearching,
    sendFriendRequest,
    isSendingRequest,
    getPendingRequests,
    pendingRequests,
    acceptFriendRequest,
    rejectFriendRequest,
    isLoadingRequests,
    clearSearch
  } = useFriendStore();

  useEffect(() => {
    getPendingRequests();
  }, [getPendingRequests]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      searchUsers(searchTerm.trim());
    }
  };

  return (
    <div className="w-full flex flex-col gap-4 py-3">
      {/* Search Section */}
      <div className="px-3">
        <form onSubmit={handleSearch} className="flex gap-2">
          <input
            type="text"
            placeholder="Search username..."
            className="input input-bordered input-sm rounded-full w-full bg-base-200"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit" className="btn btn-sm btn-primary rounded-full" disabled={isSearching}>
            {isSearching ? <Loader2 className="size-4 animate-spin" /> : <Search className="size-4" />}
          </button>
        </form>
      </div>

      {/* Search Result */}
      {searchResult && (
        <div className="px-3">
          <div className="bg-base-200 rounded-2xl p-3 flex items-center justify-between shadow-sm border border-base-content/5">
            <div className="flex items-center gap-3">
              <img
                src={searchResult.profilePic || "/avatar.png"}
                alt={searchResult.username}
                className="size-10 rounded-full object-cover"
              />
              <div>
                <p className="font-medium text-sm">{searchResult.fullName}</p>
                <p className="text-xs text-zinc-500">@{searchResult.username}</p>
              </div>
            </div>
            <button
              onClick={() => sendFriendRequest(searchResult._id)}
              disabled={isSendingRequest}
              className="btn btn-sm btn-circle btn-primary"
            >
              <UserPlus className="size-4" />
            </button>
          </div>
          <button className="text-xs text-zinc-500 mt-2 hover:underline" onClick={clearSearch}>Clear search</button>
        </div>
      )}

      <div className="divider my-1"></div>

      {/* Pending Requests */}
      <div className="px-3 flex-1 overflow-y-auto">
        <h3 className="text-sm font-semibold mb-3 text-zinc-400">Friend Requests</h3>
        
        {isLoadingRequests ? (
          <div className="flex justify-center py-4">
            <Loader2 className="size-5 animate-spin text-primary" />
          </div>
        ) : pendingRequests.length === 0 ? (
          <p className="text-xs text-zinc-500 text-center py-4">No pending requests</p>
        ) : (
          <div className="space-y-3">
            {pendingRequests.map((req) => (
              <div key={req._id} className="bg-base-200 rounded-2xl p-3 flex items-center justify-between shadow-sm border border-base-content/5">
                <div className="flex items-center gap-3 min-w-0">
                  <img
                    src={req.senderId.profilePic || "/avatar.png"}
                    alt={req.senderId.username}
                    className="size-8 rounded-full object-cover shrink-0"
                  />
                  <div className="truncate">
                    <p className="font-medium text-sm truncate">{req.senderId.fullName}</p>
                    <p className="text-xs text-zinc-500 truncate">@{req.senderId.username}</p>
                  </div>
                </div>
                <div className="flex gap-1 shrink-0">
                  <button
                    onClick={() => acceptFriendRequest(req._id)}
                    className="btn btn-xs btn-circle btn-success text-white"
                  >
                    <Check className="size-3" />
                  </button>
                  <button
                    onClick={() => rejectFriendRequest(req._id)}
                    className="btn btn-xs btn-circle btn-error text-white"
                  >
                    <X className="size-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FriendManager;
