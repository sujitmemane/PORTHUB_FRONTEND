import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  ArrowLeft,
  User,
  Edit3,
  AtSign,
  FileText,
  Camera,
  AlertCircle,
} from "lucide-react";
import ApiClient from "@/lib/axios";

import GetStartedImg from "@/assets/get-started.png";
import StepName from "./StepName";
import StepBanner from "./StepBanner";
import StepUsername from "./StepUsername";
import StepBio from "./StepBio";
import { toast } from "sonner";
import { useNavigate } from "react-router";

export const CarouselSelector = ({
  items,
  selected,
  onSelect,
  type = "banner",
}: {
  items: string[];
  selected: string;
  onSelect: (item: string) => void;
  type?: "banner" | "avatar";
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!containerRef.current) return;
    const scrollAmount = containerRef.current.clientWidth / 2;
    containerRef.current.scrollBy({
      left: direction === "right" ? scrollAmount : -scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative w-full">
      {/* Left Arrow */}
      <ArrowLeft
        className="absolute left-2 top-1/2 -translate-y-1/2 w-5 h-5 cursor-pointer text-gray-500 hover:text-gray-200 transition-colors"
        onClick={() => scroll("left")}
      />

      {/* Scrollable Items */}
      <div
        ref={containerRef}
        className="flex overflow-x-auto space-x-4 py-2 px-4 scrollbar-hide"
      >
        {items.map((item, idx) => (
          <div
            key={idx}
            className={`flex-shrink-0 cursor-pointer transition-transform duration-200 ${
              selected === item ? "ring-2 ring-[#FFCC00] shadow-md" : ""
            } ${type === "avatar" ? "rounded-full" : "rounded-lg"}`}
            style={{
              background: type === "banner" ? item : "transparent",
              width: type === "avatar" ? "70px" : "140px",
              height: type === "avatar" ? "70px" : "90px",
            }}
            onClick={() => onSelect(item)}
          >
            {type === "avatar" && (
              <img
                src={item}
                alt={`Avatar ${idx}`}
                className="w-full h-full rounded-full object-cover"
              />
            )}
          </div>
        ))}
      </div>

      {/* Right Arrow */}
      <ArrowRight
        className="absolute right-2 top-1/2 -translate-y-1/2 w-5 h-5 cursor-pointer text-gray-500 hover:text-gray-200 transition-colors"
        onClick={() => scroll("right")}
      />
    </div>
  );
};

const SecondStep = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [avatars, setAvatars] = useState<string[]>([]);
  const [backgrounds, setBackgrounds] = useState<string[]>([]);
  const [avatarsLoading, setAvatarsLoading] = useState(true);
  const [backgroundsLoading, setBackgroundsLoading] = useState(true);

  useEffect(() => {
    const fetchAvatars = async () => {
      try {
        const { data } = await ApiClient.get("/users/avatars");
        setAvatars(data.data || []);
      } catch (err) {
        console.error("Failed to fetch avatars:", err);
      } finally {
        setAvatarsLoading(false);
      }
    };
    fetchAvatars();
  }, []);

  // Fetch backgrounds
  useEffect(() => {
    const fetchBackgrounds = async () => {
      try {
        const { data } = await ApiClient.get("/users/backgrounds");
        setBackgrounds(data.data || []);
      } catch (err) {
        console.error("Failed to fetch backgrounds:", err);
      } finally {
        setBackgroundsLoading(false);
      }
    };
    fetchBackgrounds();
  }, []);
  const [selectedBanner, setSelectedBanner] = useState<string>(
    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
  );
  const [selectedAvatar, setSelectedAvatar] = useState<string>("");

  const [displayName, setDisplayName] = useState("");
  const [bannerText, setBannerText] = useState<string>("Editable Text");
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");

  console.log(bannerText, "banner Text");
  const steps = [
    {
      title: "Select a Banner",
      icon: Camera,
      description:
        "Choose a background that reflects your style and personality",
    },
    {
      title: "Choose an Avatar",
      icon: User,
      description: "Pick a profile picture that represents you",
    },
    {
      title: "Enter Your Full Name",
      icon: Edit3,
      description: "This will be displayed on your profile publicly",
    },
    {
      title: "Set a Username",
      icon: AtSign,
      description: "Create a unique handle that others can find you by",
    },
    {
      title: "Craft Your Bio",
      icon: FileText,
      description: "Write a short, professional introduction about yourself",
    },
  ];

  const StepAvatar = () => (
    <div className="w-full space-y-6">
      <div className="flex flex-col items-center space-y-4">
        <div className="w-32 h-32 rounded-full relative overflow-hidden shadow-xl border-4 border-[#FFCC00]/20">
          <img
            src={selectedAvatar}
            alt="Selected avatar"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="text-center">
          <h3 className="text-lg font-semibold text-white">
            Your Profile Picture
          </h3>
          <p className="text-sm text-gray-400">
            This is how others will see you
          </p>
        </div>
      </div>
      <CarouselSelector
        items={avatars}
        selected={selectedAvatar}
        onSelect={setSelectedAvatar}
        type="avatar"
      />
    </div>
  );

  const ProfilePreview = () => (
    <div className="w-full space-y-6">
      <div className="bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10">
        {/* Banner */}
        <div
          className="w-full h-40 rounded-xl relative overflow-hidden shadow-lg flex items-center justify-center"
          style={{ background: selectedBanner }}
        >
          <div
            contentEditable
            suppressContentEditableWarning={true}
            className="text-white text-2xl font-semibold text-center px-4 outline-none"
            onInput={(e) => setBannerText(e.currentTarget.textContent || "")}
          >
            {bannerText}
          </div>
        </div>

        {/* Profile Section */}
        <div className="p-6 relative ">
          {/* Avatar */}
          <div className="absolute -top-16 left-6 ">
            <img
              src={selectedAvatar}
              alt="Profile"
              className="w-24 h-24 bg-white rounded-full border-4 border-[#121212] object-cover"
            />
          </div>

          {/* Profile Info */}
          <div className="pt-12 space-y-3">
            <div>
              <h2 className="text-xl font-bold text-white">
                {displayName || "Your Name"}
              </h2>
              <p className="text-gray-400">@{username || "username"}</p>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              {bio || "Your bio will appear here..."}
            </p>
          </div>
        </div>
      </div>

      <div className="text-center space-y-4">
        <h3 className="text-xl font-semibold text-white">Looking good! 🎉</h3>
        <p className="text-gray-400">
          Your profile is ready to make a great first impression
        </p>
        <Button
          size="lg"
          className="bg-gradient-to-r from-[#FFCC00] to-[#FFD700] text-black font-bold px-12 py-3 rounded-xl shadow-xl hover:shadow-[#FFCC00]/25 hover:scale-105 transition-all duration-300"
        >
          Create My Portfolio
        </Button>
      </div>
    </div>
  );

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <StepBanner
            selectedBanner={selectedBanner}
            setSelectedBanner={setSelectedBanner}
            bannerText={bannerText}
            setBannerText={setBannerText}
            backgrounds={backgrounds}
          />
        );
      case 1:
        return <StepAvatar />;
      case 2:
        return (
          <StepName
            selectedAvatar={selectedAvatar}
            setDisplayName={setDisplayName}
            displayName={displayName}
          />
        );
      case 3:
        return (
          <StepUsername
            selectedAvatar={selectedAvatar}
            username={username}
            setUsername={setUsername}
          />
        );
      case 4:
        return (
          <StepBio selectedAvatar={selectedAvatar} bio={bio} setBio={setBio} />
        );
      case 5:
        return <ProfilePreview />;
      default:
        return (
          <StepBanner
            selectedBanner={selectedBanner}
            setSelectedBanner={setSelectedBanner}
            bannerText={bannerText}
            setBannerText={setBannerText}
            backgrounds={backgrounds}
          />
        );
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return selectedAvatar.length !== null;
      case 2:
        return displayName.trim().length > 0;
      case 3:
        return username.trim().length > 0;
      case 4:
        return bio.trim().length > 0;
      default:
        return true;
    }
  };
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const [errorText, setErrorText] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmitForm = async () => {
    setErrorText("");

    if (!displayName.trim()) {
      setErrorText("Display name cannot be empty.");
      return;
    }
    if (!username.trim()) {
      setErrorText("Username cannot be empty.");
      return;
    }
    if (!bio.trim()) {
      setErrorText("Bio cannot be empty.");
      return;
    }
    if (!bannerText.trim()) {
      setErrorText("Banner text cannot be empty.");
      return;
    }
    if (!selectedAvatar) {
      setErrorText("Please select an avatar.");
      return;
    }

    setLoading(true);
    try {
      const response = await ApiClient.post("/users/onboarding", {
        name: displayName,
        username,
        bio,
        bgColor: selectedBanner,
        bgText: bannerText,
        avatar: selectedAvatar,
      });

      if (response.data.success) {
        toast(response?.data?.message);
        navigate("/dashboard");
      } else {
        setErrorText(
          response?.data.message || "Something went wrong. Please try again."
        );
      }
    } catch (error: any) {
      if (error.response) {
        setErrorText(error.response.data?.message || "Server error occurred.");
      } else if (error.request) {
        setErrorText("Network error. Please check your connection.");
      } else {
        setErrorText("Unexpected error. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid min-h-screen w-full grid-cols-1 lg:grid-cols-2 ">
      <div className="hidden lg:block">
        <img
          src={GetStartedImg}
          alt="Login Illustration"
          width={1920}
          height={1080}
          className="h-full w-full object-cover"
          style={{ aspectRatio: "1920/1080", objectFit: "cover" }}
        />
      </div>

      <div
        className={`min-h-screen w-full bg-gradient-to-br from-[#0F0F0F] to-[#1A1A1A] flex items-center justify-center p-4 ${
          mounted ? "animate-in fade-in duration-1000" : "opacity-0"
        }`}
      >
        <div className="w-full max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center space-x-2 mb-6">
              <span className="text-4xl font-extrabold text-[#FFCC00]">
                Port
              </span>
              <span className="bg-gradient-to-r from-[#FFCC00] to-[#FFD700] text-black text-4xl font-extrabold px-3 py-1 rounded-lg">
                hub
              </span>
            </div>

            {currentStep < 5 && (
              <>
                {/* Step Counter */}
                <div className="text-sm text-gray-400 mb-2">
                  Step {currentStep + 1} of 5
                </div>

                {/* Step Description */}
                <p className="text-gray-400 mb-6">
                  {steps[currentStep].description}
                </p>

                {/* Progress Bar */}
                <div className="w-full bg-white/10 rounded-full h-2 mb-8">
                  <div
                    className="bg-gradient-to-r from-[#FFCC00] to-[#FFD700] h-2 rounded-full transition-all duration-500"
                    style={{ width: `${((currentStep + 1) / 5) * 100}%` }}
                  ></div>
                </div>
              </>
            )}
          </div>

          {/* Step Content */}
          <div className="bg-[#121212] rounded-xl p-8 mb-4">{renderStep()}</div>
          {errorText && (
            <div className="w-full mb-4 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 text-sm flex items-center gap-2">
              <AlertCircle className="w-4 h-4 mr-2" />
              <span>{errorText}</span>
            </div>
          )}

          {/* Navigation */}
          {currentStep < 5 && (
            <div className="flex justify-between">
              <Button
                variant="outline"
                onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                disabled={currentStep === 0}
                className="border-white/20 text-[#111111] hover:opacity-90 "
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              {currentStep !== 4 && (
                <Button
                  onClick={() => setCurrentStep(Math.min(5, currentStep + 1))}
                  disabled={!canProceed()}
                  className="bg-gradient-to-r from-[#FFCC00] to-[#FFD700] text-black font-semibold hover:opacity-90 transition-opacity"
                >
                  Continue
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              )}

              {currentStep === 4 && (
                <Button
                  onClick={handleSubmitForm}
                  className="bg-gradient-to-r from-[#FFCC00] to-[#FFD700] text-black font-semibold hover:opacity-90 transition-opacity"
                >
                  Submit
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SecondStep;
