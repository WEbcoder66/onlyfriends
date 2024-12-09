"use client";

import React, { useState, useMemo } from 'react';
import { Lock, Play, Volume2, VolumeX, X } from 'lucide-react';

interface Profile {
  name: string;
  location: string;
  bio: string;
  stats: {
    posts: number;
    followers: string;
  }
}

interface ContentItem {
  id: number;
  type: 'photo' | 'video';
  thumbnail: string;
  videoUrl?: string;
  isPremium: boolean;
  duration?: string;
  isTrailer?: boolean;
}

const PortfolioGrid: React.FC = () => {
  const [playingVideo, setPlayingVideo] = useState<number | null>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [activeTab, setActiveTab] = useState<'all' | 'photos' | 'videos'>('all');
  const [modalContent, setModalContent] = useState<{
    type: 'photo' | 'video';
    src: string;
    isOpen: boolean;
  }>({ type: 'photo', src: '', isOpen: false });

  const profile: Profile = {
    name: "Desiree Black♡",            
    location: "In Your Mind & In Your Bed",          
    bio: "👑Ts Romanian Princess👑",  
    stats: {
      posts: 19,               
      followers: "30.5K",           
    }           
  };

  const content: ContentItem[] = [
    // First item - Trailer
    {
      id: 1,
      type: 'video',
      thumbnail: '/images/trailer-thumb.jpg',
      videoUrl: '/videos/trailer.mp4',
      isPremium: false,
      duration: '00:30',
      isTrailer: true
    },
    // Free content (4 more items to make 5 total free)
    {
      id: 2,
      type: 'photo',
      thumbnail: '/images/post2.jpg',
      isPremium: true,
    },
    {
      id: 3,
      type: 'photo',
      thumbnail: '/images/post3.jpg',
      isPremium: true,
    },
    {
      id: 4,
      type: 'photo',
      thumbnail: '/images/post4.jpg',
      isPremium: true,
    },
    {
      id: 5,
      type: 'photo',
      thumbnail: '/images/post5.jpg',
      isPremium: false,
    },
    // Premium content (14 items)
    {
      id: 6,
      type: 'video',
      thumbnail: '/images/post6.jpg',
      videoUrl: '/videos/video6.mp4',
      isPremium: true,
      duration: '01:15'
    },
    {
      id: 7,
      type: 'photo',
      thumbnail: '/images/post7.jpg',
      isPremium: true,
    },
    {
      id: 8,
      type: 'video',
      thumbnail: '/images/post8.jpg',
      videoUrl: '/videos/video8.mp4',
      isPremium: true,
      duration: '02:30'
    },
    {
      id: 9,
      type: 'photo',
      thumbnail: '/images/post9.jpg',
      isPremium: true,
    },
    {
      id: 10,
      type: 'photo',
      thumbnail: '/images/post10.jpg',
      isPremium: false,
    },
    {
      id: 11,
      type: 'video',
      thumbnail: '/images/post11.jpg',
      videoUrl: '/videos/video11.mp4',
      isPremium: true,
      duration: '01:45'
    },
    {
      id: 12,
      type: 'photo',
      thumbnail: '/images/post12.jpg',
      isPremium: false,
    },
    {
      id: 13,
      type: 'photo',
      thumbnail: '/images/post13.jpg',
      isPremium: true,
    },
    {
      id: 14,
      type: 'video',
      thumbnail: '/images/post14.jpg',
      videoUrl: '/videos/video14.mp4',
      isPremium: true,
      duration: '03:00'
    },
    {
      id: 15,
      type: 'photo',
      thumbnail: '/images/post15.jpg',
      isPremium: true,
    },
    {
      id: 16,
      type: 'photo',
      thumbnail: '/images/post16.jpg',
      isPremium: true,
    },
    {
      id: 17,
      type: 'photo',
      thumbnail: '/images/post17.jpg',
      isPremium: false,
    },
    {
      id: 18,
      type: 'video',
      thumbnail: '/images/post18.jpg',
      videoUrl: '/videos/video18.mp4',
      isPremium: true,
      duration: '02:15'
    },
    {
      id: 19,
      type: 'photo',
      thumbnail: '/images/post19.jpg',
      isPremium: true,
    },
  ];

  const contentStats = useMemo(() => {
    const photoCount = content.filter(item => item.type === 'photo').length;
    const videoCount = content.filter(item => item.type === 'video').length;
    
    return {
      photos: photoCount,
      videos: videoCount,
      total: content.length
    };
  }, [content]);

  const filteredContent = useMemo(() => {
    switch (activeTab) {
      case 'photos':
        return content.filter(item => item.type === 'photo');
      case 'videos':
        return content.filter(item => item.type === 'video');
      default:
        return content;
    }
  }, [content, activeTab]);

  const handlePremiumContent = () => {
    const subscribeElement = document.getElementById('subscribe-button');
    if (subscribeElement) {
      subscribeElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const openModal = (type: 'photo' | 'video', src: string) => {
    if (type === 'video') {
      setPlayingVideo(null);
    }
    setModalContent({ type, src, isOpen: true });
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setModalContent({ ...modalContent, isOpen: false });
    document.body.style.overflow = 'unset';
  };

  const handlePlayClick = (id: number) => {
    setPlayingVideo(id);
    setIsMuted(false);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Profile Header */}
      <div className="max-w-4xl mx-auto pt-8 px-4">
        <div className="flex items-center gap-8 mb-6">
          <div className="w-20 h-20 rounded-full overflow-hidden relative">
            <img 
              src="/images/profile.jpg"
              alt={profile.name}
              className="w-20 h-20 object-cover rounded-full"
            />
          </div>
          <div className="flex-1">
            <h1 className="text-xl font-normal mb-1">{profile.name}</h1>
            <p className="text-gray-400 text-sm mb-2">{profile.location}</p>
          </div>
        </div>
        
        {/* Stats */}
        <div className="flex gap-8 mb-6 text-sm">
          <div className="flex items-center gap-1">
            <span className="text-gray-400">{profile.stats.posts}</span>
            <span className="text-gray-400">Posts</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-gray-400">{profile.stats.followers}</span>
            <span className="text-gray-400">followers</span>
          </div>
        </div>

        <button 
          id="subscribe-button"
          className="w-full bg-blue-500 hover:bg-blue-600 transition-colors text-white py-2 rounded-md text-sm font-medium mb-4"
        >
          Subscribe • Cancel anytime
        </button>
        
        <p className="text-sm text-gray-400 mb-6">{profile.bio}</p>
      </div>

      {/* Content Navigation */}
      <div className="border-t border-gray-800">
        <div className="max-w-4xl mx-auto flex">
          <button 
            className={`py-3 px-4 text-sm font-medium transition-colors relative ${
              activeTab === 'all' 
                ? 'text-white border-t border-white' 
                : 'text-gray-400 hover:text-white'
            }`}
            onClick={() => setActiveTab('all')}
          >
            All ({contentStats.total})
          </button>
          <button 
            className={`py-3 px-4 text-sm font-medium transition-colors relative ${
              activeTab === 'photos' 
                ? 'text-white border-t border-white' 
                : 'text-gray-400 hover:text-white'
            }`}
            onClick={() => setActiveTab('photos')}
          >
            Photos ({contentStats.photos})
          </button>
          <button 
            className={`py-3 px-4 text-sm font-medium transition-colors relative ${
              activeTab === 'videos' 
                ? 'text-white border-t border-white' 
                : 'text-gray-400 hover:text-white'
            }`}
            onClick={() => setActiveTab('videos')}
          >
            Videos ({contentStats.videos})
          </button>
        </div>
      </div>

      {/* Grid Layout */}
      <div className="max-w-4xl mx-auto px-4 pb-8">
        <div className="grid grid-cols-3 gap-1">
          {filteredContent.map((item) => (
            <div key={item.id} className="relative aspect-square w-full group">
              <div className="relative w-full h-full">
                {item.type === 'video' && !item.isPremium ? (
                  // Video Content
                  <div className="absolute inset-0">
                    {playingVideo === item.id ? (
                      <div className="relative w-full h-full">
                        <video
                          src={item.videoUrl}
                          className="w-full h-full object-cover cursor-pointer"
                          autoPlay
                          loop
                          muted={isMuted}
                          playsInline
                          onClick={() => openModal('video', item.videoUrl!)}
                        />
                        {item.isTrailer && (
                          <div className="absolute bottom-2 right-2 flex gap-2">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setIsMuted(!isMuted);
                              }}
                              className="w-8 h-8 flex items-center justify-center rounded-full bg-black/50 hover:bg-black/70 transition-colors"
                            >
                              {isMuted ? (
                                <VolumeX className="w-4 h-4 text-white" />
                              ) : (
                                <Volume2 className="w-4 h-4 text-white" />
                              )}
                            </button>
                          </div>
                        )}
                      </div>
                    ) : (
                      <>
                        <img
                          src={item.thumbnail}
                          alt=""
                          className="absolute inset-0 w-full h-full object-cover cursor-pointer"
                          loading="lazy"
                          onClick={() => handlePlayClick(item.id)}
                        />
                        <div 
                          className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/40 transition-colors cursor-pointer"
                          onClick={() => handlePlayClick(item.id)}
                        >
                          <div className="w-12 h-12 flex items-center justify-center rounded-full bg-white/25 group-hover:bg-white/30 transition-colors">
                            <Play className="w-6 h-6 text-white" />
                          </div>
                        </div>
                      </>
                    )}
                    <span className="absolute top-2 right-2 text-xs text-white bg-black/50 px-1 rounded z-10">
                      {item.duration}
                    </span>
                  </div>
                ) : (
                  // Photo Content
                  <div className="absolute inset-0">
                    <img
                      src={item.thumbnail}
                      alt=""
                      className={`absolute inset-0 w-full h-full object-cover ${
                        item.isPremium ? 'blur-xl brightness-50' : 'cursor-pointer'
                      }`}
                      loading="lazy"
                      onClick={() => !item.isPremium && openModal('photo', item.thumbnail)}
                    />
                    {item.isPremium && (
                      <button 
                        onClick={handlePremiumContent}
                        className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 hover:bg-black/50 transition-colors group"
                      >
                        <Lock className="w-6 h-6 text-white/90 mb-2" />
                        <span className="text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                          Subscribe to unlock
                        </span>
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredContent.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400">No {activeTab} to display</p>
          </div>
        )}
      </div>

      {/* Modal */}
      {modalContent.isOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95"
          onClick={closeModal}
        >
          <div className="relative w-full h-full flex items-center justify-center p-4">
            <button 
              onClick={closeModal}
              className="absolute top-4 right-4 z-50 p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors"
            >
              <X className="w-6 h-6 text-white" />
            </button>

            {modalContent.type === 'video' ? (
              <video
                src={modalContent.src}
                className="max-w-full max-h-[90vh] object-contain"
                autoPlay
                controls
                loop
                playsInline
                muted={isMuted}
                onClick={(e) => e.stopPropagation()}
              />
            ) : (
              <div 
                className="relative max-w-full max-h-[90vh] w-auto h-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={modalContent.src}
                  alt=""
                  className="max-w-full max-h-[90vh] object-contain"
                />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PortfolioGrid;