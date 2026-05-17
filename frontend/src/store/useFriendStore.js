import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";
import { useChatStore } from "./useChatStore.js";

export const useFriendStore = create((set, get) => ({
  searchResult: null,
  pendingRequests: [],
  isSearching: false,
  isSendingRequest: false,
  isLoadingRequests: false,
  isAcceptingRequest: false,

  searchUsers: async (username) => {
    set({ isSearching: true, searchResult: null });
    try {
      const res = await axiosInstance.get(`/friends/search/${username}`);
      set({ searchResult: res.data });
    } catch (error) {
      toast.error(error.response?.data?.message || "User not found");
      set({ searchResult: null });
    } finally {
      set({ isSearching: false });
    }
  },

  sendFriendRequest: async (receiverId) => {
    set({ isSendingRequest: true });
    try {
      await axiosInstance.post(`/friends/request/${receiverId}`);
      toast.success("Friend request sent!");
      set({ searchResult: null });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to send request");
    } finally {
      set({ isSendingRequest: false });
    }
  },

  getPendingRequests: async () => {
    set({ isLoadingRequests: true });
    try {
      const res = await axiosInstance.get("/friends/requests/pending");
      set({ pendingRequests: res.data });
    } catch (error) {
      console.log("Error fetching pending requests:", error);
    } finally {
      set({ isLoadingRequests: false });
    }
  },

  acceptFriendRequest: async (requestId) => {
    set({ isAcceptingRequest: true });
    try {
      await axiosInstance.put(`/friends/request/${requestId}/accept`);
      toast.success("Friend request accepted!");
      set((state) => ({
        pendingRequests: state.pendingRequests.filter((req) => req._id !== requestId),
      }));
      // refresh the users (friends) list in the sidebar
      useChatStore.getState().getUsers();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to accept request");
    } finally {
      set({ isAcceptingRequest: false });
    }
  },

  rejectFriendRequest: async (requestId) => {
    try {
      await axiosInstance.put(`/friends/request/${requestId}/reject`);
      toast.success("Friend request rejected");
      set((state) => ({
        pendingRequests: state.pendingRequests.filter((req) => req._id !== requestId),
      }));
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to reject request");
    }
  },

  clearSearch: () => set({ searchResult: null })
}));
