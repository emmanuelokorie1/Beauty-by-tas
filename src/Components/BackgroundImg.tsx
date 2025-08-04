import { useState, useEffect } from 'react';

interface customProps {
  img?: any;
  header?: string;
  text?: string;
  text1?: string;
  check?: boolean;
  overlayType?: 'dark' | 'light' | 'auto';
  height?: 'small' | 'medium' | 'large' | 'custom';
  customHeight?: string;
  showGradient?: boolean;
  animation?: 'fade' | 'slide' | 'zoom' | 'none';
}

const BackgroundImg: React.FC<customProps> = ({
  img,
  text,
  header,
  check,
  text1,
  overlayType = 'dark',
  height = 'medium',
  customHeight,
  showGradient = true,
  animation = 'fade',
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Height mapping
  const getHeight = () => {
    if (customHeight) return customHeight;
    switch (height) {
      case 'small': return 'h-[200px] md:h-[250px]';
      case 'medium': return 'h-[250px] md:h-[300px] lg:h-[350px]';
      case 'large': return 'h-[300px] md:h-[400px] lg:h-[500px]';
      default: return 'h-[250px] md:h-[300px] lg:h-[350px]';
    }
  };

  // Animation classes
  const getAnimationClasses = () => {
    switch (animation) {
      case 'fade': return 'animate-fade-in';
      case 'slide': return 'animate-slide-up';
      case 'zoom': return 'animate-zoom-in';
      case 'none': return '';
      default: return 'animate-fade-in';
    }
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
    setImageError(false);
  };

  const handleImageError = () => {
    setImageError(true);
    setImageLoaded(false);
  };

  return (
    <div className="relative overflow-hidden">
      <section
        className={`relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center ${
          check ? "justify-start" : "justify-center"
        } ${getHeight()} transition-all duration-700 ${getAnimationClasses()}`}
      >
        {/* Background Image */}
        {img && !imageError && (
          <img
            src={img}
            alt="background"
            className={`w-full absolute h-full object-cover transition-all duration-1000 ${
              imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-110'
            }`}
            onLoad={handleImageLoad}
            onError={handleImageError}
          />
        )}

        {/* Fallback Pattern */}
        {imageError && (
          <div className="absolute inset-0 bg-gradient-to-br from-pink-400 via-purple-500 to-indigo-600 opacity-20">
            <div className="absolute inset-0 opacity-30">
              <div className="w-full h-full bg-repeat" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
              }}></div>
            </div>
          </div>
        )}

        {/* Dynamic Overlay */}
        <div className={`absolute inset-0 transition-all duration-500 ${
          overlayType === 'light' 
            ? 'bg-white bg-opacity-70' 
            : 'bg-black bg-opacity-60'
        }`}></div>

        {/* Gradient Overlay */}
        {showGradient && (
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
        )}

        {/* Content Container */}
        <div
          className={`absolute w-[90%] z-10 transition-all duration-700 ${
            overlayType === 'light' ? 'text-gray-800' : 'text-white'
          } ${
            !check
              ? "text-center lg:w-[60%] md:w-[80%]"
              : "sm:ps-[5rem] ps-0 text-center sm:text-start lg:w-[40%] md:w-[60%]"
          }`}
        >
          {/* Subtitle */}
          {text1 && (
            <div className={`font-semibold text-sm md:text-base mb-2 opacity-90 ${
              overlayType === 'light' ? 'text-gray-700' : 'text-gray-200'
            } animate-fade-in-up`}>
              {text1}
            </div>
          )}

          {/* Main Header */}
          <div className={`md:text-[2.5rem] sm:text-[2rem] text-[1.7rem] font-bold uppercase tracking-wide leading-tight mb-3 ${
            overlayType === 'light' ? 'text-gray-900' : 'text-white'
          } animate-fade-in-up animation-delay-200`}>
            {header}
          </div>

          {/* Description */}
          {text && (
            <div className={`sm:text-[1rem] text-[.9rem] leading-relaxed opacity-90 ${
              overlayType === 'light' ? 'text-gray-700' : 'text-gray-200'
            } animate-fade-in-up animation-delay-400`}>
              {text}
            </div>
          )}

          {/* Decorative Elements */}
          <div className="mt-4 flex items-center justify-center sm:justify-start space-x-2 animate-fade-in-up animation-delay-600">
            <div className={`w-8 h-1 rounded-full ${
              overlayType === 'light' ? 'bg-gray-800' : 'bg-white'
            }`}></div>
            <div className={`w-4 h-1 rounded-full ${
              overlayType === 'light' ? 'bg-gray-600' : 'bg-gray-300'
            }`}></div>
            <div className={`w-2 h-1 rounded-full ${
              overlayType === 'light' ? 'bg-gray-400' : 'bg-gray-400'
            }`}></div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className={`absolute top-4 right-4 w-16 h-16 rounded-full ${
            overlayType === 'light' ? 'bg-gray-800/20' : 'bg-white/10'
          } animate-pulse`}></div>
          <div className={`absolute bottom-8 left-8 w-8 h-8 rounded-full ${
            overlayType === 'light' ? 'bg-gray-600/30' : 'bg-white/20'
          } animate-bounce`}></div>
        </div>
      </section>
    </div>
  );
};

export default BackgroundImg;
