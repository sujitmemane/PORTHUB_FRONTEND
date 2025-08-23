const Logo = ({ size = "4xl" }) => {
  return (
    <div className="flex items-center justify-center space-x-2 mb-6">
      <span className={`text-${size} font-extrabold text-[#FFCC00]`}>Port</span>
      <span
        className={`bg-gradient-to-r from-[#FFCC00] to-[#FFD700] text-black text-${size} font-extrabold px-3 py-1 rounded-lg`}
      >
        hub
      </span>
    </div>
  );
};

export default Logo;
