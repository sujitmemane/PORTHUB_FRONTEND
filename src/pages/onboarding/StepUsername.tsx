type StepUsernameProps = {
  selectedAvatar: string;
  username: string;
  setUsername: (value: string) => void;
};

const StepUsername: React.FC<StepUsernameProps> = ({
  selectedAvatar,
  username,
  setUsername,
}) => {
  return (
    <div className="w-full space-y-6">
      <div className="text-center space-y-2 flex justify-center items-center flex-col">
        <div className="w-32 h-32 rounded-full relative overflow-hidden shadow-xl border-4 border-[#FFCC00]/20">
          <img
            src={selectedAvatar}
            alt="Selected avatar"
            className="w-full h-full object-cover"
          />
        </div>
        <h3 className="text-xl font-semibold text-white">Choose a username</h3>
        <p className="text-gray-400">This will be your unique identifier</p>
      </div>

      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
          @
        </span>
        <input
          type="text"
          value={username}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setUsername(e.target.value.replace(/[^a-zA-Z0-9_]/g, ""))
          }
          placeholder="username"
          className="w-full pl-8 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FFCC00] focus:border-transparent transition-all"
          maxLength={15}
        />
      </div>

      <div className="flex justify-between text-sm">
        <span className="text-gray-500">
          Only letters, numbers, and underscores
        </span>
        <span className="text-gray-500">{username.length}/15</span>
      </div>
    </div>
  );
};

export default StepUsername;
