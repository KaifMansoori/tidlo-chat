import { MessageSquare } from "lucide-react";

const NoChatSelected = () => {
  return (
    <div className="w-full flex flex-1 flex-col items-center justify-center p-16 bg-transparent">
      <div className="max-w-md text-center space-y-6">
        {/* Icon Display */}
        <div className="flex justify-center gap-4 mb-4">
          <div className="relative">
            <div
              className="w-20 h-20 rounded-3xl bg-primary flex items-center
             justify-center animate-[pulse_3s_ease-in-out_infinite] shadow-[0_0_40px_rgba(0,0,0,0.1)] shadow-primary/40"
            >
              <MessageSquare className="w-10 h-10 text-primary-content" />
            </div>
          </div>
        </div>

        {/* Welcome Text */}
        <h2 className="text-3xl font-extrabold tracking-tight">Welcome to tidlo</h2>
        <p className="text-base-content/60 text-lg font-medium">
          Select a conversation from the sidebar to start chatting
        </p>
      </div>
    </div>
  );
};

export default NoChatSelected;
