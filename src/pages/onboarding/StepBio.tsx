type StepBioProps = {
  selectedAvatar: string;
  bio: string;
  setBio: (value: string) => void;
};

const StepBio: React.FC<StepBioProps> = ({ selectedAvatar, bio, setBio }) => {
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
        <h3 className="text-xl font-semibold text-white">
          Tell us about yourself
        </h3>
        <p className="text-gray-400">Write a short bio for your profile</p>
      </div>

      <textarea
        value={bio}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
          setBio(e.target.value)
        }
        placeholder="I'm a passionate developer who loves creating amazing web experiences..."
        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FFCC00] focus:border-transparent transition-all resize-none"
        rows={4}
        maxLength={160}
      />

      <div className="text-right text-sm text-gray-500">{bio.length}/160</div>
    </div>
  );
};

export default StepBio;
