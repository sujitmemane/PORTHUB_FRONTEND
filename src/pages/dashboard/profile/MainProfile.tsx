import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import ApiClient from "@/lib/axios";
import { ArrowLeft, ArrowRight } from "lucide-react";
import UserLinks from "@/components/profile/UserLinks";
import QuickInfo from "@/components/profile/QuickIntro";
import About from "@/components/profile/About";

const MainProfile = () => {
  const [profile, setProfile] = useState({});
  const [bannerText, setBannerText] = useState("");
  const [bannerIndex, setBannerIndex] = useState(0);
  const [avatarIndex, setAvatarIndex] = useState<number>(0);
  const [avatars, setAvatars] = useState([]);
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch profile + optional dynamic avatars/banners
  const fetchProfile = async () => {
    try {
      const profileRes = await ApiClient.get("/users/profile");
      if (profileRes?.data?.success) {
        const data = profileRes.data.data;
        setProfile(data);
        setBannerText(data?.banner?.bgText || "");
      }

      // Optional: fetch dynamic avatars from API
      try {
        const avatarsRes = await ApiClient.get("/users/avatars");
        if (avatarsRes?.data?.data?.length) {
          setAvatars(avatarsRes.data.data);
          const preAvatarIndex = avatarsRes.data.data.findIndex(
            (a: string) => a === profileRes?.data?.data?.avatar
          );
          setAvatarIndex(preAvatarIndex !== -1 ? preAvatarIndex : 0);
        }
      } catch (err) {
        console.error("Failed to fetch avatars, using predefined ones:", err);
      }

      // Optional: fetch dynamic banners from API
      try {
        const bannersRes = await ApiClient.get("/users/backgrounds");
        if (bannersRes?.data?.data?.length) {
          setBanners(bannersRes.data.data);
          const preBannerIndex = bannersRes.data.data.findIndex(
            (b: string) => b === profileRes?.data?.data?.banner?.bgColor
          );
          setBannerIndex(preBannerIndex !== -1 ? preBannerIndex : 0);
        }
      } catch (err) {
        console.error("Failed to fetch banners, using predefined ones:", err);
      }
    } catch (error) {
      console.error("Failed to fetch profile:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  // Update profile avatar/banner when index changes
  useEffect(() => {
    setProfile((prev) => ({
      ...prev,
      banner: { ...prev.banner, bgColor: banners[bannerIndex] },
      avatar: avatars[avatarIndex],
    }));
  }, [bannerIndex, avatarIndex, banners, avatars]);

  const nextBanner = () =>
    setBannerIndex((prev) => (prev + 1) % banners.length);
  const prevBanner = () =>
    setBannerIndex((prev) => (prev - 1 + banners.length) % banners.length);

  const nextAvatar = () =>
    setAvatarIndex((prev) => (prev + 1) % avatars.length);
  const prevAvatar = () =>
    setAvatarIndex((prev) => (prev - 1 + avatars.length) % avatars.length);

  if (loading) return <div className="text-white p-4">Loading...</div>;

  return (
    <div>
      {/* Sticky Top Stats */}
      {/* <div className="sticky top-0 border-b border-gray-700 p-4 z-10 bg-transparent">
        <div className="flex flex-col items-center space-y-1">
          <h1 className="text-2xl font-bold text-white text-center">
            {profile?.name || "Your Name"}
          </h1>
        </div>
      </div> */}

      {/* Profile Section */}
      <div className="w-full space-y-6">
        <div className="bg-white/5 backdrop-blur-sm overflow-hidden border border-white/10">
          {/* Banner */}
          <div className="relative w-full">
            <div
              className="w-full h-40 flex items-center justify-center text-white text-2xl font-semibold shadow-lg relative"
              style={{ background: profile?.banner?.bgColor }}
              contentEditable
              suppressContentEditableWarning={true}
              onInput={(e) => setBannerText(e.currentTarget.textContent || "")}
            >
              {bannerText || "Your Banner Text"}
            </div>

            {/* Banner Controls */}
            <button
              onClick={prevBanner}
              className="absolute left-3 top-1/2 -translate-y-1/2 cursor-pointer bg-black/30 hover:bg-black/50 text-white rounded-full w-8 h-8 flex items-center justify-center"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button
              onClick={nextBanner}
              className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer bg-black/30 hover:bg-black/50 text-white rounded-full w-8 h-8 flex items-center justify-center"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Avatar */}
          <div className="relative p-6 flex items-start">
            <div className="absolute -top-16 left-6">
              <img
                src={profile?.avatar}
                alt="Profile"
                className="w-32 h-32 bg-white rounded-full border-4 border-black object-cover"
              />
              {/* Avatar Controls */}
              <div className="flex justify-center gap-2 mt-2">
                <button
                  onClick={prevAvatar}
                  className="absolute left-3 top-1/2 -translate-y-1/2 cursor-pointer bg-black/50 hover:bg-black/50 text-white rounded-full w-8 h-8 flex items-center justify-center"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={nextAvatar}
                  className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer bg-black/50 hover:bg-black/50 text-white rounded-full w-8 h-8 flex items-center justify-center"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Profile Info */}
            <div className=" pt-12 space-y-3">
              <div>
                <h2 className="text-xl font-bold text-white">
                  {profile?.name || "Your Name"}
                </h2>
                <p className="text-gray-400">
                  @{profile?.username || "username"}
                </p>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed">
                {profile?.bio || "Your bio will appear here..."}
              </p>
            </div>
          </div>
        </div>
      </div>

      <UserLinks />
      <QuickInfo />
      <About />

      {/* Tabs / Posts */}
    </div>
  );
};

export default MainProfile;
