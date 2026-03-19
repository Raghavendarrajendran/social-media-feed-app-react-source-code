import type { MediaItem } from '../types';

interface MediaCollageProps {
  media: MediaItem[];
  className?: string;
}

export function MediaCollage({ media, className = '' }: MediaCollageProps) {
  if (media.length === 0) return null;

  if (media.length === 1) {
    const item = media[0];
    return (
      <div className={`rounded-lg overflow-hidden ${className}`}>
        {item.type === 'image' ? (
          <img
            src={item.url}
            alt=""
            className="w-full max-h-96 object-cover"
          />
        ) : (
          <video
            src={item.url}
            controls
            className="w-full max-h-96"
            playsInline
          />
        )}
      </div>
    );
  }

  if (media.length === 2) {
    return (
      <div className={`grid grid-cols-2 gap-1 rounded-lg overflow-hidden ${className}`}>
        {media.map((item, i) => (
          <div key={i} className="aspect-square">
            {item.type === 'image' ? (
              <img src={item.url} alt="" className="w-full h-full object-cover" />
            ) : (
              <video src={item.url} controls className="w-full h-full object-cover" playsInline />
            )}
          </div>
        ))}
      </div>
    );
  }

  if (media.length === 3) {
    return (
      <div className={`grid grid-cols-2 gap-1 rounded-lg overflow-hidden ${className}`}>
        <div className="row-span-2">
          {media[0].type === 'image' ? (
            <img src={media[0].url} alt="" className="w-full h-full object-cover min-h-[200px]" />
          ) : (
            <video src={media[0].url} controls className="w-full h-full min-h-[200px] object-cover" playsInline />
          )}
        </div>
        {media.slice(1).map((item, i) => (
          <div key={i} className="aspect-square">
            {item.type === 'image' ? (
              <img src={item.url} alt="" className="w-full h-full object-cover" />
            ) : (
              <video src={item.url} controls className="w-full h-full object-cover" playsInline />
            )}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={`grid grid-cols-2 gap-1 rounded-lg overflow-hidden ${className}`}>
      {media.map((item, i) => (
        <div key={i} className="aspect-square">
          {item.type === 'image' ? (
            <img src={item.url} alt="" className="w-full h-full object-cover" />
          ) : (
            <video src={item.url} controls className="w-full h-full object-cover" playsInline />
          )}
        </div>
      ))}
    </div>
  );
}
