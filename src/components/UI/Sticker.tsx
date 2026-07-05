import { useState, useRef } from 'react';

interface StickerProps {
  src: string;
  size?: number | string;
  initialRotation?: number | string;
  alt?: string;
}

export default function Sticker({ src, size = 120, initialRotation = 0, alt = "Interactive Sticker" }: StickerProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [imgError, setImgError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  
  const numSize = typeof size === 'string' ? parseInt(size) || 120 : size;
  const numRotation = typeof initialRotation === 'string' ? parseFloat(initialRotation) || 0 : initialRotation;

  const dragStart = useRef({ x: 0, y: 0 });
  const posStart = useRef({ x: 0, y: 0 });

  const handlePointerDown = (e: React.PointerEvent) => {
    e.preventDefault();
    setIsDragging(true);
    dragStart.current = { x: e.clientX, y: e.clientY };
    posStart.current = { ...position };
    // Use ref for bulletproof pointer capture
    if (imgRef.current) imgRef.current.setPointerCapture(e.pointerId); 
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const dx = e.clientX - dragStart.current.x;
    const dy = e.clientY - dragStart.current.y;
    setPosition({
      x: posStart.current.x + dx,
      y: posStart.current.y + dy,
    });
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    setIsDragging(false);
    if (imgRef.current && imgRef.current.hasPointerCapture(e.pointerId)) {
      imgRef.current.releasePointerCapture(e.pointerId);
    }
  };

  if (imgError) {
    return (
      <div className="inline-flex items-center justify-center border-2 border-dashed border-red-400 bg-red-50 text-red-500 text-xs font-mono p-2 rounded my-4" style={{ width: numSize, height: numSize }}>
        404: {src.split('/').pop()}
      </div>
    );
  }

  return (
    <img
      ref={imgRef}
      src={src}
      alt={alt}
      width={numSize}
      height={numSize}
      onError={() => setImgError(true)}
      className={`
        select-none transition-all duration-200 my-4
        drop-shadow-md hover:drop-shadow-xl
        ${isDragging ? 'cursor-grabbing drop-shadow-2xl' : 'cursor-grab'}
      `}
      style={{
        transform: `translate(${position.x}px, ${position.y}px) rotate(${numRotation + (isDragging ? 8 : 0)}deg) scale(${isDragging ? 1.15 : 1})`,
        touchAction: 'none', 
        transition: isDragging ? 'none' : 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), filter 0.2s', 
        zIndex: isDragging ? 9999 : 20, 
        position: 'relative',
        display: 'inline-block',
        maxWidth: '100%',
        height: 'auto',
      }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      draggable={false}
    />
  );
}