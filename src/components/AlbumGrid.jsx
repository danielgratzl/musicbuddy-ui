import React from 'react';
import AlbumCard from './AlbumCard';

const AlbumGrid = ({ albums, onAlbumClick }) => {
  if (albums.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-apple-textSecondary text-lg">No albums found</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
      {albums.map((album, index) => (
        <AlbumCard
          key={`${album.Title}-${album.Artist}-${index}`}
          album={album}
          onClick={onAlbumClick}
        />
      ))}
    </div>
  );
};

export default AlbumGrid;
