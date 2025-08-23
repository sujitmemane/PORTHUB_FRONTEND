type StepNameProps = {
  selectedAvatar: string;
  displayName: string;
  setDisplayName: (value: string) => void;
};

const StepName: React.FC<StepNameProps> = ({
  selectedAvatar,
  displayName,
  setDisplayName,
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
        <h3 className="text-xl font-semibold text-white">What's your name?</h3>
        <p className="text-gray-400">This will be displayed on your profile</p>
      </div>

      <input
        type="text"
        value={displayName}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setDisplayName(e.target.value)
        }
        placeholder="Enter your display name"
        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FFCC00] focus:border-transparent transition-all"
        maxLength={50}
      />

      <div className="text-right text-sm text-gray-500">
        {displayName.length}/50
      </div>
    </div>
  );
};

export default StepName;
