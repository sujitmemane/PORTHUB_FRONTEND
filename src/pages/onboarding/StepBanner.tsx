import { useEffect, useRef } from "react";
import { CarouselSelector } from "./SecondStep";

type StepBannerProps = {
  backgrounds: string[];
  selectedBanner: string;
  setSelectedBanner: (banner: string) => void;
  bannerText: string;
  setBannerText: (text: string) => void;
};

const StepBanner: React.FC<StepBannerProps> = ({
  backgrounds,
  selectedBanner,
  setSelectedBanner,
  bannerText,
  setBannerText,
}) => {
  const editableRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (editableRef.current && editableRef.current.textContent !== bannerText) {
      editableRef.current.textContent = bannerText;
    }
  }, [bannerText]);
  return (
    <div className="w-full space-y-6">
      <div
        className="w-full h-40 rounded-xl relative overflow-hidden shadow-lg flex items-center justify-center"
        style={{ background: selectedBanner }}
      >
        <div
          ref={editableRef}
          contentEditable
          suppressContentEditableWarning
          className="text-white text-2xl font-semibold text-center px-4 outline-none"
          onInput={(e: React.FormEvent<HTMLDivElement>) => {
            setBannerText(e.currentTarget.textContent || "");
          }}
          onBlur={(e: React.FocusEvent<HTMLDivElement>) => {
            setBannerText(e.currentTarget.textContent || "");
          }}
        />
      </div>

      <CarouselSelector
        items={backgrounds}
        selected={selectedBanner}
        onSelect={setSelectedBanner}
        type="banner"
      />
    </div>
  );
};

export default StepBanner;
