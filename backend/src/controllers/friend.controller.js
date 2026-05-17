import User from "../models/user.model.js";
import FriendRequest from "../models/friendRequest.model.js";

export const searchUsers = async (req, res) => {
  try {
    const { username } = req.params;
    const currentUserId = req.user._id;

    // Search by exact username (or partial if you want, but exact is safer for unique usernames)
    const user = await User.findOne({ username: username.toLowerCase() }).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user._id.toString() === currentUserId.toString()) {
      return res.status(400).json({ message: "You cannot search for yourself" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.log("Error in searchUsers: ", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const sendFriendRequest = async (req, res) => {
  try {
    const { receiverId } = req.params;
    const senderId = req.user._id;

    if (senderId.toString() === receiverId) {
      return res.status(400).json({ message: "Cannot send friend request to yourself" });
    }

    const receiver = await User.findById(receiverId);
    if (!receiver) {
      return res.status(404).json({ message: "User not found" });
    }

    if (receiver.friends.includes(senderId)) {
      return res.status(400).json({ message: "You are already friends" });
    }

    const existingRequest = await FriendRequest.findOne({
      $or: [
        { senderId, receiverId },
        { senderId: receiverId, receiverId: senderId }
      ],
      status: "pending"
    });

    if (existingRequest) {
      return res.status(400).json({ message: "Pending request already exists" });
    }

    const newRequest = new FriendRequest({
      senderId,
      receiverId
    });

    await newRequest.save();

    res.status(201).json({ message: "Friend request sent", request: newRequest });
  } catch (error) {
    console.log("Error in sendFriendRequest: ", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const acceptFriendRequest = async (req, res) => {
  try {
    const { requestId } = req.params;
    const currentUserId = req.user._id;

    const request = await FriendRequest.findById(requestId);

    if (!request) {
      return res.status(404).json({ message: "Friend request not found" });
    }

    if (request.receiverId.toString() !== currentUserId.toString()) {
      return res.status(403).json({ message: "Unauthorized to accept this request" });
    }

    if (request.status !== "pending") {
      return res.status(400).json({ message: "Request is no longer pending" });
    }

    request.status = "accepted";
    await request.save();

    // Add each other to friends arrays
    await User.findByIdAndUpdate(request.senderId, { $push: { friends: request.receiverId } });
    await User.findByIdAndUpdate(request.receiverId, { $push: { friends: request.senderId } });

    res.status(200).json({ message: "Friend request accepted" });
  } catch (error) {
    console.log("Error in acceptFriendRequest: ", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const rejectFriendRequest = async (req, res) => {
  try {
    const { requestId } = req.params;
    const currentUserId = req.user._id;

    const request = await FriendRequest.findById(requestId);

    if (!request) {
      return res.status(404).json({ message: "Friend request not found" });
    }

    if (request.receiverId.toString() !== currentUserId.toString()) {
      return res.status(403).json({ message: "Unauthorized to reject this request" });
    }

    if (request.status !== "pending") {
      return res.status(400).json({ message: "Request is no longer pending" });
    }

    request.status = "rejected";
    await request.save();

    res.status(200).json({ message: "Friend request rejected" });
  } catch (error) {
    console.log("Error in rejectFriendRequest: ", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getPendingRequests = async (req, res) => {
  try {
    const currentUserId = req.user._id;

    const requests = await FriendRequest.find({
      receiverId: currentUserId,
      status: "pending"
    }).populate("senderId", "fullName username profilePic");

    res.status(200).json(requests);
  } catch (error) {
    console.log("Error in getPendingRequests: ", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
