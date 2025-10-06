import React from 'react';

const AlbumCard = ({ album, onClick }) => {
  const imageUrl = album['Uploaded Image URL'] || 'https://via.placeholder.com/300x300?text=No+Cover';

  return (
    <div
      onClick={() => onClick(album)}
      className="group cursor-pointer transition-all duration-200 hover:scale-105"
    >
      <div className="relative aspect-square rounded-lg overflow-hidden bg-apple-card mb-3 shadow-lg">
        <img
          src={imageUrl}
          alt={album.Title}
          className="w-full h-full object-cover"
          loading="lazy"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/300x300?text=No+Cover';
          }}
        />
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200" />
      </div>
      <div className="space-y-1">
        <h3 className="font-semibold text-apple-text truncate group-hover:text-apple-accent transition-colors">
          {album.Title}
        </h3>
        <p className="text-sm text-apple-textSecondary truncate">
          {album.Artist}
        </p>
        <p className="text-xs text-apple-textSecondary">
          {album.releaseYear}
        </p>
      </div>
    </div>
  );
};

export default AlbumCard;
