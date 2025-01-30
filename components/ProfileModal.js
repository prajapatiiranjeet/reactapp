import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';

export default function ProfileModal({ isOpen, onClose }) {
  const modalRef = useRef();
  const [following, setFollowing] = useState(false);
  const [followers, setFollowers] = useState(90);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center animate-fadeIn">
      <div ref={modalRef} className="bg-[#151515] rounded-xl w-[300px] relative animate-modalIn">
        <div className="h-20 bg-gradient-to-r from-blue-600 to-blue-800 animate-slideDown" />
        
        <div className="p-6">
          <button onClick={onClose} className="absolute top-4 right-4 text-white/60 hover:text-white">
            ✕
          </button>

          <div className="flex flex-col items-center -mt-16">
            <div className="w-24 h-24 rounded-full border-4 border-[#151515] overflow-hidden mb-4">
              <Image
                src="/profile-image.jpg"
                alt="Profile"
                width={96}
                height={96}
                className="object-cover"
              />
            </div>

            <h2 className="text-2xl text-white font-bold">Albert Feynman</h2>
            <p className="text-gray-400 mb-4">👥 {followers} followers</p>

            <button 
              onClick={() => {
                setFollowing(!following);
                setFollowers(prev => following ? prev - 1 : prev + 1);
              }}
              className={`px-6 py-2 rounded-lg transition-all duration-300 ${
                following 
                  ? 'bg-blue-600 hover:bg-blue-700' 
                  : 'border-2 border-blue-600 hover:bg-blue-600/10'
              } text-white`}
            >
              {following ? 'Following' : 'Follow'}
            </button>

            <div className="grid grid-cols-3 gap-4 w-full mt-8 text-center">
              <div>
                <p className="text-blue-500 text-sm">Pens</p>
                <p className="text-white font-bold">29</p>
              </div>
              <div>
                <p className="text-blue-500 text-sm">Projects</p>
                <p className="text-white font-bold">0</p>
              </div>
              <div>
                <p className="text-blue-500 text-sm">Posts</p>
                <p className="text-white font-bold">0</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}