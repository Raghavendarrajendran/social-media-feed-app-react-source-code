import { useRef } from 'react';
import type { MediaItem } from '../types';

interface MediaPickerProps {
  media: MediaItem[];
  onChange: (media: MediaItem[]) => void;
  maxItems?: number;
}

const MAX_FILE_SIZE_MB = 5;
const MAX_FILE_SIZE = MAX_FILE_SIZE_MB * 1024 * 1024;

export function MediaPicker({ media, onChange, maxItems = 6 }: MediaPickerProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;
    const remaining = maxItems - media.length;
    const toProcess = files.slice(0, remaining);

    toProcess.forEach((file) => {
      if (file.size > MAX_FILE_SIZE) return;
      const reader = new FileReader();
      reader.onload = () => {
        const url = reader.result as string;
        const type = file.type.startsWith('video/') ? 'video' : 'image';
        onChange([...media, { url, type }]);
      };
      reader.readAsDataURL(file);
    });

    e.target.value = '';
  };

  const removeMedia = (index: number) => {
    onChange(media.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-2">
        {media.map((item, i) => (
          <div key={i} className="relative group">
            {item.type === 'image' ? (
              <img
                src={item.url}
                alt=""
                className="w-20 h-20 object-cover rounded-lg border border-[var(--border-color)]"
              />
            ) : (
              <video
                src={item.url}
                className="w-20 h-20 object-cover rounded-lg border border-[var(--border-color)]"
                muted
                playsInline
              />
            )}
            <button
              type="button"
              onClick={() => removeMedia(i)}
              className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-red-500 text-white text-sm hover:bg-red-600 transition-colors opacity-0 group-hover:opacity-100"
              aria-label="Remove"
            >
              ✕
            </button>
          </div>
        ))}
        {media.length < maxItems && (
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="w-20 h-20 rounded-lg border-2 border-dashed border-[var(--border-color)] hover:border-[var(--accent)] hover:bg-[var(--accent)]/5 transition-colors flex items-center justify-center text-2xl"
            aria-label="Add image or video"
          >
            +
          </button>
        )}
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*,video/*"
        multiple
        onChange={handleFileSelect}
        className="hidden"
      />
    </div>
  );
}
