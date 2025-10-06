import React from 'react';

const FilterPanel = ({
  genres,
  selectedGenre,
  onGenreChange,
  sortBy,
  onSortChange
}) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
      {/* Genre Filter */}
      <select
        value={selectedGenre}
        onChange={(e) => onGenreChange(e.target.value)}
        className="px-4 py-2 bg-apple-card text-apple-text rounded-lg focus:outline-none focus:ring-2 focus:ring-apple-accent cursor-pointer"
      >
        <option value="">All Genres</option>
        {genres.map((genre) => (
          <option key={genre} value={genre}>
            {genre}
          </option>
        ))}
      </select>

      {/* Sort */}
      <select
        value={sortBy}
        onChange={(e) => onSortChange(e.target.value)}
        className="px-4 py-2 bg-apple-card text-apple-text rounded-lg focus:outline-none focus:ring-2 focus:ring-apple-accent cursor-pointer"
      >
        <option value="title">Sort by Title</option>
        <option value="artist">Sort by Artist</option>
        <option value="year">Sort by Year</option>
        <option value="rating">Sort by Rating</option>
      </select>
    </div>
  );
};

export default FilterPanel;
