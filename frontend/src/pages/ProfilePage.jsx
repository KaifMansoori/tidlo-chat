import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Camera, Mail, User, MapPin, Phone, Info, Save } from "lucide-react";

const ProfilePage = () => {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  const [selectedImg, setSelectedImg] = useState(null);
  const [formData, setFormData] = useState({
    fullName: authUser?.fullName || "",
    username: authUser?.username || "",
    bio: authUser?.bio || "",
    location: authUser?.location || "",
    phone: authUser?.phone || "",
  });

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setSelectedImg(reader.result);
    };
  };

  const handleSave = async (e) => {
    e.preventDefault();
    await updateProfile({ ...formData, profilePic: selectedImg });
    setSelectedImg(null);
  };

  return (
    <div className="h-screen pt-20 overflow-y-auto">
      <div className="max-w-2xl mx-auto p-4 py-8">
        <form onSubmit={handleSave} className="bg-base-300 rounded-xl p-6 space-y-8">
          <div className="text-center">
            <h1 className="text-2xl font-semibold">Profile</h1>
            <p className="mt-2 text-zinc-400">Manage your profile information</p>
          </div>

          {/* avatar upload section */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <img
                src={selectedImg || authUser?.profilePic || "/avatar.png"}
                alt="Profile"
                className="size-32 rounded-full object-cover border-4 border-base-200"
              />
              <label
                htmlFor="avatar-upload"
                className={`
                  absolute bottom-0 right-0 
                  bg-base-content hover:scale-105
                  p-2 rounded-full cursor-pointer 
                  transition-all duration-200
                  ${isUpdatingProfile ? "animate-pulse pointer-events-none" : ""}
                `}
              >
                <Camera className="w-5 h-5 text-base-200" />
                <input
                  type="file"
                  id="avatar-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isUpdatingProfile}
                />
              </label>
            </div>
            <p className="text-sm text-zinc-400">
              Click the camera icon to select a new photo
            </p>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label text-sm text-zinc-400 flex gap-2 items-center">
                  <User className="w-4 h-4" /> Full Name
                </label>
                <input
                  type="text"
                  className="input input-bordered w-full"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                />
              </div>

              <div className="form-control">
                <label className="label text-sm text-zinc-400 flex gap-2 items-center">
                  <User className="w-4 h-4" /> Username
                </label>
                <input
                  type="text"
                  className="input input-bordered w-full"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                />
              </div>
            </div>

            <div className="form-control">
              <label className="label text-sm text-zinc-400 flex gap-2 items-center">
                <Info className="w-4 h-4" /> Bio
              </label>
              <textarea
                className="textarea textarea-bordered w-full"
                rows="2"
                placeholder="Tell us about yourself..."
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              ></textarea>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label text-sm text-zinc-400 flex gap-2 items-center">
                  <MapPin className="w-4 h-4" /> Location
                </label>
                <input
                  type="text"
                  className="input input-bordered w-full"
                  placeholder="City, Country"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                />
              </div>

              <div className="form-control">
                <label className="label text-sm text-zinc-400 flex gap-2 items-center">
                  <Phone className="w-4 h-4" /> Phone
                </label>
                <input
                  type="text"
                  className="input input-bordered w-full"
                  placeholder="+1 234 567 890"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
            </div>

            <div className="form-control">
              <label className="label text-sm text-zinc-400 flex gap-2 items-center">
                <Mail className="w-4 h-4" /> Email Address (Read Only)
              </label>
              <p className="px-4 py-2.5 bg-base-200 rounded-lg border text-zinc-400">{authUser?.email}</p>
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t border-base-100">
            <button
              type="submit"
              className="btn btn-primary flex gap-2 items-center"
              disabled={isUpdatingProfile}
            >
              <Save className="w-4 h-4" />
              {isUpdatingProfile ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;
