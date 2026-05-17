import { useRef, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { Image, Send, X } from "lucide-react";
import toast from "react-hot-toast";

const MessageInput = () => {
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  const { sendMessage } = useChatStore();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!text.trim() && !imagePreview) return;

    try {
      await sendMessage({
        text: text.trim(),
        image: imagePreview,
      });

      // Clear form
      setText("");
      setImagePreview(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  return (
    <div className="p-4 w-full bg-base-100/30 backdrop-blur-sm border-t border-base-content/5 rounded-br-3xl">
      {imagePreview && (
        <div className="mb-4 flex items-center gap-2">
          <div className="relative group">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-20 h-20 object-cover rounded-2xl border border-base-content/10 shadow-sm"
            />
            <button
              onClick={removeImage}
              className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-base-100 shadow-md border border-base-content/10
              flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity scale-90 group-hover:scale-100"
              type="button"
            >
              <X className="size-3.5 text-base-content/70" />
            </button>
          </div>
        </div>
      )}

      <form onSubmit={handleSendMessage} className="flex items-end gap-3">
        <div className="flex-1 flex items-center gap-2 bg-base-200/50 hover:bg-base-200/80 focus-within:bg-base-200/80 transition-all rounded-[2rem] p-1.5 shadow-inner border border-base-content/5">
          <button
            type="button"
            className={`flex-shrink-0 flex btn btn-circle btn-sm md:btn-md btn-ghost hover:bg-base-100
                     ${imagePreview ? "text-primary bg-primary/10" : "text-base-content/50"}`}
            onClick={() => fileInputRef.current?.click()}
          >
            <Image size={20} />
          </button>
          
          <input
            type="text"
            className="w-full bg-transparent border-none focus:outline-none focus:ring-0 px-2 py-3 text-[15px]"
            placeholder="Message..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleImageChange}
          />
        </div>
        
        <button
          type="submit"
          className="btn btn-circle btn-primary shadow-md shadow-primary/20 hover:scale-105 transition-transform flex-shrink-0 h-12 w-12 md:h-14 md:w-14"
          disabled={!text.trim() && !imagePreview}
        >
          <Send size={20} className={!text.trim() && !imagePreview ? "text-primary-content/50" : "text-primary-content"} />
        </button>
      </form>
    </div>
  );
};
export default MessageInput;
