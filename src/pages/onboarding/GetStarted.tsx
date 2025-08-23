import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, Globe, Trophy, Users } from "lucide-react";
import PortfolioImg from "@/assets/portfolio.png";
import { Link } from "react-router-dom";

const GetStarted = () => {
  const [mounted, setMounted] = useState(false);
  const [currentFeature, setCurrentFeature] = useState(0);

  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % 4);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const features = [
    { icon: Zap, text: "Lightning fast setup" },
    { icon: Globe, text: "Share anywhere instantly" },
    { icon: Trophy, text: "Stand out from the crowd" },
    { icon: Users, text: "Impress recruiters & clients" },
  ];

  return (
    <div className="grid min-h-screen w-full grid-cols-1 lg:grid-cols-2 overflow-hidden">
      {/* Left-side illustration with gradient overlay */}
      <div className="hidden lg:block">
        <img
          src={PortfolioImg}
          alt="Login Illustration"
          width={1920}
          height={1080}
          className="h-full w-full object-cover"
          style={{ aspectRatio: "1920/1080", objectFit: "cover" }}
        />
      </div>

      {/* Right-side content */}
      <div className="flex flex-col items-center justify-center p-6 lg:p-16 bg-gradient-to-br from-[#0F0F0F] to-[#1A1A1A] relative">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 20% 80%, rgba(255, 204, 0, 0.3) 0%, transparent 50%),
                              radial-gradient(circle at 80% 20%, rgba(147, 51, 234, 0.3) 0%, transparent 50%)`,
            }}
          ></div>
        </div>

        <div
          className={`mx-auto w-full max-w-lg space-y-8 text-center relative z-10 ${
            mounted ? "animate-in fade-in duration-1000" : "opacity-0"
          }`}
        >
          {/* PortHub Logo with enhanced styling */}
          <div className="flex items-center justify-center space-x-2 mb-8">
            <span className="text-5xl font-extrabold text-[#FFCC00] drop-shadow-lg">
              Port
            </span>
            <span className="bg-gradient-to-r from-[#FFCC00] to-[#FFD700] text-black text-5xl font-extrabold px-4 py-2 rounded-xl shadow-2xl transform hover:scale-105 transition-transform duration-300">
              hub
            </span>
          </div>

          {/* Headline with gradient text */}
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white via-white to-gray-300 bg-clip-text text-transparent leading-tight">
              Build Your Portfolio
              <br />
              <span className="bg-gradient-to-r from-[#FFCC00] to-[#FFD700] bg-clip-text text-transparent">
                Lightning Fast
              </span>
            </h1>

            {/* Animated tagline */}
            <p className="text-[#FFCC00] font-semibold text-lg md:text-xl">
              Say goodbye to boring resumes — your portfolio is your new{" "}
              <span className="relative">
                identity
                <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-[#FFCC00] to-transparent"></div>
              </span>
              !
            </p>
          </div>

          {/* Enhanced description */}
          <p className="text-gray-300 text-lg leading-relaxed">
            Showcase your projects, blogs, skills, and work history all in one
            stunning place.
            <br />
            <span className="text-[#FFCC00]/80 font-medium">
              Create and share in minutes, not hours.
            </span>
          </p>

          {/* Rotating features */}
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
            <div className="flex items-center justify-center space-x-3 text-gray-300">
              {React.createElement(features[currentFeature].icon, {
                className: "w-5 h-5 text-[#FFCC00]",
              })}
              <span className="font-medium">
                {features[currentFeature].text}
              </span>
            </div>
          </div>

          {/* Enhanced CTA Button */}
          <div className="space-y-4">
            <Link to={"get-started"}>
              <Button
                size="lg"
                className="bg-gradient-to-r from-[#FFCC00] to-[#FFD700] text-black font-bold px-12 py-4 rounded-xl shadow-2xl hover:shadow-[#FFCC00]/25 hover:scale-105 transition-all duration-300 group relative overflow-hidden"
              >
                <span className="relative z-10 flex items-center space-x-2">
                  <span>Get Started Now</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#FFD700] to-[#FFCC00] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Button>
            </Link>

            <p className="text-gray-500 text-sm">
              No credit card required • 100% free to start
            </p>
          </div>

          {/* Trust indicators */}
          <div className="flex items-center justify-center space-x-8 text-gray-600 text-sm pt-4">
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Trusted by 10K+</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-[#FFCC00] rounded-full"></div>
              <span>No coding required</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetStarted;

// import React, { useState } from "react";
// import {
//   Home,
//   Search,
//   Bell,
//   Mail,
//   Bookmark,
//   Users,
//   Zap,
//   User,
//   MoreHorizontal,
//   Settings,
//   MessageSquare,
//   Repeat2,
//   Heart,
//   BarChart3,
//   Share,
//   Calendar,
//   MapPin,
//   Link,
//   Verified,
// } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Badge } from "@/components/ui/badge";

// const TwitterClone = () => {
//   const [activeTab, setActiveTab] = useState("Posts");

//   const sidebarItems = [
//     { icon: Home, label: "Home", active: false },
//     { icon: Search, label: "Explore", active: false },
//     { icon: Bell, label: "Notifications", active: false },
//     { icon: Mail, label: "Messages", active: false },
//     { icon: Bookmark, label: "Bookmarks", active: false },
//     { icon: Users, label: "Communities", active: false },
//     { icon: Zap, label: "Premium", active: false },
//     { icon: Settings, label: "Verified Orgs", active: false },
//     { icon: Settings, label: "Community Notes", active: false },
//     { icon: User, label: "Profile", active: true },
//     { icon: MoreHorizontal, label: "More", active: false },
//   ];

//   const tabs = ["Posts", "Replies", "Highlights", "Articles", "Media", "Likes"];

//   const posts = [
//     {
//       id: 1,
//       pinned: true,
//       content: "Be comfortable doing hard things",
//       timestamp: "Jun 3",
//       replies: 0,
//       retweets: 0,
//       likes: 2,
//       views: "1.1K",
//     },
//     {
//       id: 2,
//       pinned: false,
//       content: "you can't defeat lonely and ambitious person",
//       timestamp: "Aug 8",
//       replies: 0,
//       retweets: 0,
//       likes: 0,
//       views: "178",
//     },
//   ];

//   const liveSpaces = [
//     {
//       host: "Yacine Mahdid",
//       verified: true,
//       title: "The Neural Basis of Moral Judgement | Neuro/AI Paper ...",
//       listeners: 132,
//       avatars: [
//         "/api/placeholder/32/32",
//         "/api/placeholder/32/32",
//         "/api/placeholder/32/32",
//       ],
//     },
//     {
//       host: "Ankush Dharkar",
//       verified: true,
//       title: "You need to TRIPLE your efforts, not your ti...",
//       listeners: 42,
//       avatars: [
//         "/api/placeholder/32/32",
//         "/api/placeholder/32/32",
//         "/api/placeholder/32/32",
//       ],
//     },
//     {
//       host: "Prateekaaryan",
//       title: "Dasyu Space",
//       listeners: 27,
//       avatars: [
//         "/api/placeholder/32/32",
//         "/api/placeholder/32/32",
//         "/api/placeholder/32/32",
//       ],
//     },
//   ];

//   const suggestions = [
//     { name: "Dev Shakya", username: "@devxoshakya", verified: false },
//     { name: "Dipanshu Pandey", username: "@callmepandey", verified: false },
//     { name: "Prince Gupta", username: "@codemastercppYT", verified: true },
//   ];

//   return (
//     <div className="min-h-screen bg-black text-white flex">
//       {/* Left Sidebar */}
//       <div className="w-64 border-r border-gray-800 p-4 flex flex-col">
//         <div className="mb-8">
//           <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
//             <span className="text-black font-bold">𝕏</span>
//           </div>
//         </div>

//         <div
//           contentEditable="true"
//           className="border border-gray-300 p-3 min-h-[100px] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//         >
//           Write your blog here...
//         </div>

//         <nav className="flex-1 space-y-2">
//           {sidebarItems.map((item, index) => (
//             <div
//               key={index}
//               className={`flex items-center space-x-3 p-3 rounded-full hover:bg-gray-900 cursor-pointer ${
//                 item.active ? "font-bold" : ""
//               }`}
//             >
//               <item.icon className="w-6 h-6" />
//               <span className="text-xl">{item.label}</span>
//             </div>
//           ))}
//         </nav>

//         <Button className="w-full bg-blue-500 hover:bg-blue-600 rounded-full py-3 text-lg font-bold mb-4">
//           Post
//         </Button>

//         <div className="flex items-center space-x-3 p-3 hover:bg-gray-900 rounded-full cursor-pointer">
//           <Avatar className="w-10 h-10">
//             <AvatarImage src="/api/placeholder/40/40" alt="Sujeeth" />
//             <AvatarFallback>S</AvatarFallback>
//           </Avatar>
//           <div className="flex-1">
//             <div className="font-bold">Sujeeth</div>
//             <div className="text-gray-500">@SwexyDev</div>
//           </div>
//           <MoreHorizontal className="w-5 h-5" />
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="flex-1 max-w-2xl border-r border-gray-800">
//         {/* Header */}
//         <div className="sticky top-0 bg-black/80 backdrop-blur-md border-b border-gray-800 p-4">
//           <div className="flex items-center space-x-4">
//             <Button variant="ghost" size="sm" className="p-2">
//               <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
//                 <path
//                   fillRule="evenodd"
//                   d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
//                   clipRule="evenodd"
//                 />
//               </svg>
//             </Button>
//             <div>
//               <h1 className="text-xl font-bold">Sujeeth</h1>
//               <p className="text-gray-500 text-sm">7077 posts</p>
//             </div>
//           </div>
//         </div>

//         {/* Profile Section */}
//         <div className="relative">
//           <div className="h-48 bg-gradient-to-r from-purple-900 via-blue-900 to-indigo-900"></div>
//           <div className="absolute -bottom-16 left-4">
//             <Avatar className="w-32 h-32 border-4 border-black">
//               <AvatarImage src="/api/placeholder/128/128" alt="Sujeeth" />
//               <AvatarFallback className="text-4xl">S</AvatarFallback>
//             </Avatar>
//           </div>
//           <div className="flex justify-end p-4">
//             <Button
//               variant="outline"
//               className="border-gray-600 text-white hover:bg-gray-900"
//             >
//               Edit profile
//             </Button>
//           </div>
//         </div>

//         <div className="p-4 pt-0">
//           <div className="mt-4">
//             <div className="flex items-center space-x-2">
//               <h2 className="text-2xl font-bold">Sujeeth</h2>
//               <Verified className="w-5 h-5 text-blue-500 fill-current" />
//               <span className="text-sm bg-blue-500 text-white px-2 py-1 rounded">
//                 Get verified
//               </span>
//             </div>
//             <p className="text-gray-500">@SwexyDev</p>
//           </div>

//           <div className="mt-4">
//             <p className="text-white">Backend Engineer | DevOps</p>
//             <p className="text-white">On a journey to become a backend God.</p>
//             <p className="text-white">
//               Tech • Fitness • Music • Movies • Entrepreneurship • History •
//               Wars
//             </p>
//           </div>

//           <div className="flex items-center space-x-4 mt-4 text-gray-500">
//             <div className="flex items-center space-x-1">
//               <Link className="w-4 h-4" />
//               <span>Web Design Agency</span>
//             </div>
//             <div className="flex items-center space-x-1">
//               <MapPin className="w-4 h-4" />
//               <span>India</span>
//             </div>
//             <div className="flex items-center space-x-1">
//               <Calendar className="w-4 h-4" />
//               <span>Born May 13, 2004</span>
//             </div>
//             <div className="flex items-center space-x-1">
//               <Calendar className="w-4 h-4" />
//               <span>Joined December 2019</span>
//             </div>
//           </div>

//           <div className="flex space-x-4 mt-4">
//             <span className="hover:underline cursor-pointer">
//               <span className="font-bold text-white">1,424</span>{" "}
//               <span className="text-gray-500">Following</span>
//             </span>
//             <span className="hover:underline cursor-pointer">
//               <span className="font-bold text-white">1,700</span>{" "}
//               <span className="text-gray-500">Followers</span>
//             </span>
//           </div>
//         </div>

//         {/* Tabs */}
//         <div className="border-b border-gray-800">
//           <div className="flex">
//             {tabs.map((tab) => (
//               <button
//                 key={tab}
//                 onClick={() => setActiveTab(tab)}
//                 className={`flex-1 p-4 hover:bg-gray-900 relative ${
//                   activeTab === tab ? "font-bold" : "text-gray-500"
//                 }`}
//               >
//                 {tab}
//                 {activeTab === tab && (
//                   <div className="absolute bottom-0 left-0 right-0 h-1 bg-blue-500 rounded-full"></div>
//                 )}
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* Posts */}
//         <div className="divide-y divide-gray-800">
//           {posts.map((post) => (
//             <div key={post.id} className="p-4 hover:bg-gray-950 cursor-pointer">
//               <div className="flex space-x-3">
//                 <Avatar className="w-12 h-12">
//                   <AvatarImage src="/api/placeholder/48/48" alt="Sujeeth" />
//                   <AvatarFallback>S</AvatarFallback>
//                 </Avatar>
//                 <div className="flex-1">
//                   {post.pinned && (
//                     <div className="flex items-center space-x-2 text-gray-500 mb-2">
//                       <svg
//                         className="w-4 h-4"
//                         fill="currentColor"
//                         viewBox="0 0 20 20"
//                       >
//                         <path d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4z" />
//                       </svg>
//                       <span className="text-sm">Pinned</span>
//                     </div>
//                   )}

//                   <div className="flex items-center space-x-2 mb-2">
//                     <span className="font-bold">Sujeeth</span>
//                     <span className="text-gray-500">@SwexyDev</span>
//                     <span className="text-gray-500">·</span>
//                     <span className="text-gray-500">{post.timestamp}</span>
//                     <Button variant="ghost" size="sm" className="ml-auto p-2">
//                       <MoreHorizontal className="w-4 h-4" />
//                     </Button>
//                     {post.pinned && (
//                       <Button className="bg-gray-800 hover:bg-gray-700 text-sm px-3 py-1">
//                         Promote
//                       </Button>
//                     )}
//                   </div>

//                   <p className="text-white mb-3">{post.content}</p>

//                   <div className="flex items-center justify-between max-w-md">
//                     <Button
//                       variant="ghost"
//                       size="sm"
//                       className="flex items-center space-x-2 text-gray-500 hover:text-blue-500"
//                     >
//                       <MessageSquare className="w-4 h-4" />
//                       <span>{post.replies}</span>
//                     </Button>
//                     <Button
//                       variant="ghost"
//                       size="sm"
//                       className="flex items-center space-x-2 text-gray-500 hover:text-green-500"
//                     >
//                       <Repeat2 className="w-4 h-4" />
//                       <span>{post.retweets}</span>
//                     </Button>
//                     <Button
//                       variant="ghost"
//                       size="sm"
//                       className="flex items-center space-x-2 text-gray-500 hover:text-red-500"
//                     >
//                       <Heart className="w-4 h-4" />
//                       <span>{post.likes}</span>
//                     </Button>
//                     <Button
//                       variant="ghost"
//                       size="sm"
//                       className="flex items-center space-x-2 text-gray-500 hover:text-blue-500"
//                     >
//                       <BarChart3 className="w-4 h-4" />
//                       <span>{post.views}</span>
//                     </Button>
//                     <div className="flex space-x-2">
//                       <Button
//                         variant="ghost"
//                         size="sm"
//                         className="text-gray-500 hover:text-blue-500"
//                       >
//                         <Bookmark className="w-4 h-4" />
//                       </Button>
//                       <Button
//                         variant="ghost"
//                         size="sm"
//                         className="text-gray-500 hover:text-blue-500"
//                       >
//                         <Share className="w-4 h-4" />
//                       </Button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Right Sidebar */}
//       <div className="w-80 p-4 space-y-6">
//         {/* Search */}
//         <div className="relative">
//           <Search className="absolute left-3 top-3 w-5 h-5 text-gray-500" />
//           <Input
//             placeholder="Search"
//             className="pl-12 bg-gray-900 border-gray-700 text-white placeholder-gray-500 rounded-full"
//           />
//         </div>

//         {/* Live on X */}
//         <div className="bg-gray-900 rounded-2xl p-4">
//           <h3 className="text-xl font-bold mb-4">Live on X</h3>
//           <div className="space-y-4">
//             {liveSpaces.map((space, index) => (
//               <div key={index} className="space-y-2">
//                 <div className="flex items-center space-x-2">
//                   <Avatar className="w-6 h-6">
//                     <AvatarImage
//                       src="/api/placeholder/24/24"
//                       alt={space.host}
//                     />
//                     <AvatarFallback>{space.host[0]}</AvatarFallback>
//                   </Avatar>
//                   <span className="text-sm text-gray-300">{space.host}</span>
//                   {space.verified && (
//                     <Verified className="w-4 h-4 text-blue-500 fill-current" />
//                   )}
//                   <span className="text-sm text-gray-500">is hosting</span>
//                 </div>
//                 <h4 className="font-semibold text-sm leading-tight">
//                   {space.title}
//                 </h4>
//                 <div className="flex items-center justify-between">
//                   <div className="flex -space-x-2">
//                     {space.avatars.map((avatar, i) => (
//                       <Avatar
//                         key={i}
//                         className="w-6 h-6 border-2 border-gray-900"
//                       >
//                         <AvatarImage src="/api/placeholder/24/24" alt="" />
//                         <AvatarFallback>U</AvatarFallback>
//                       </Avatar>
//                     ))}
//                     <div className="w-6 h-6 bg-gray-700 rounded-full flex items-center justify-center text-xs font-bold border-2 border-gray-900">
//                       +{space.listeners}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* You might like */}
//         <div className="bg-gray-900 rounded-2xl p-4">
//           <h3 className="text-xl font-bold mb-4">You might like</h3>
//           <div className="space-y-4">
//             {suggestions.map((user, index) => (
//               <div key={index} className="flex items-center justify-between">
//                 <div className="flex items-center space-x-3">
//                   <Avatar className="w-10 h-10">
//                     <AvatarImage src="/api/placeholder/40/40" alt={user.name} />
//                     <AvatarFallback>{user.name[0]}</AvatarFallback>
//                   </Avatar>
//                   <div>
//                     <div className="flex items-center space-x-1">
//                       <span className="font-bold text-sm">{user.name}</span>
//                       {user.verified && (
//                         <Verified className="w-4 h-4 text-blue-500 fill-current" />
//                       )}
//                     </div>
//                     <span className="text-gray-500 text-sm">
//                       {user.username}
//                     </span>
//                   </div>
//                 </div>
//                 <Button className="bg-white text-black hover:bg-gray-200 rounded-full px-4 py-1 text-sm font-bold">
//                   Follow
//                 </Button>
//               </div>
//             ))}
//           </div>
//           <Button
//             variant="ghost"
//             className="text-blue-500 hover:bg-gray-800 w-full mt-4"
//           >
//             Show more
//           </Button>
//         </div>

//         {/* What's happening */}
//         <div className="bg-gray-900 rounded-2xl p-4">
//           <h3 className="text-xl font-bold mb-4">What's happening</h3>
//           <div className="space-y-3">
//             <div className="hover:bg-gray-800 p-2 rounded cursor-pointer">
//               <p className="text-gray-500 text-sm">Entertainment · Trending</p>
//               <p className="font-bold">#AA22</p>
//               <p className="text-gray-500 text-sm">5,186 posts</p>
//             </div>
//           </div>
//           <Button
//             variant="ghost"
//             className="text-blue-500 hover:bg-gray-800 w-full mt-4"
//           >
//             Show more
//           </Button>
//         </div>
//       </div>

//       {/* Messages Sidebar */}
//       <div className="w-80 border-l border-gray-800 p-4">
//         <div className="flex items-center justify-between mb-4">
//           <h3 className="text-xl font-bold">Messages</h3>
//           <div className="flex space-x-2">
//             <Button variant="ghost" size="sm" className="p-2">
//               <Settings className="w-5 h-5" />
//             </Button>
//             <Button variant="ghost" size="sm" className="p-2">
//               <MoreHorizontal className="w-5 h-5" />
//             </Button>
//           </div>
//         </div>

//         <div className="text-center py-8">
//           <h4 className="text-2xl font-bold mb-2">Welcome to your inbox!</h4>
//           <p className="text-gray-500 mb-4">
//             Drop a line, share posts and more with private conversations between
//             you and others on X.
//           </p>
//           <Button className="bg-blue-500 hover:bg-blue-600 rounded-full px-6 py-2 font-bold">
//             Write a message
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TwitterClone;
