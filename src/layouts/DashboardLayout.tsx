import Sidebar from "@/components/dashboard/Sidebar";

const DashboardLayout = ({ mainElement, sideElement }) => {
  return (
    <div className="bg-gradient-to-br from-[#0F0F0F] to-[#1A1A1A] min-h-screen">
      <div className="max-w-7xl mx-auto flex text-white">
        {/* Left Sidebar */}
        <div className="w-64 xl:w-72 flex-shrink-0 sticky top-0 h-screen">
          <div className="h-full border-r border-gray-800/30">
            <Sidebar />
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 min-w-0 border-r  border-gray-800/30">
          <div className="h-screen overflow-y-auto">{mainElement}</div>
        </div>

        {/* Right Sidebar */}
        <div className="w-80 xl:w-96 flex-shrink-0 sticky top-0 h-screen">
          <div className="h-full overflow-y-auto p-6">
            <div className="space-y-6">{sideElement}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
