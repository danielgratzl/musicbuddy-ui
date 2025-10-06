import React, { useEffect } from 'react';

const AlbumDetail = ({ album, onClose }) => {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  if (!album) return null;

  const imageUrl = album['Uploaded Image URL'] || 'https://via.placeholder.com/400x400?text=No+Cover';

  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-80" onClick={onClose}>
      <div
        className="bg-apple-card rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-8">
          {/* Close button */}
          <button
            onClick={onClose}
            className="float-right text-apple-textSecondary hover:text-apple-text transition-colors"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="flex flex-col md:flex-row gap-8 mt-4">
            {/* Album Cover */}
            <div className="flex-shrink-0">
              <img
                src={imageUrl}
                alt={album.Title}
                className="w-full md:w-80 rounded-lg shadow-xl"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/400x400?text=No+Cover';
                }}
              />
            </div>

            {/* Album Info */}
            <div className="flex-1 space-y-6">
              <div>
                <h2 className="text-3xl font-bold text-apple-text mb-2">{album.Title}</h2>
                <p className="text-xl text-apple-accent mb-1">{album.Artist}</p>
                <p className="text-apple-textSecondary">
                  {album.releaseYear} • {album.Labels || 'Unknown Label'}
                </p>
              </div>

              {/* Genres */}
              {album.genres.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold text-apple-textSecondary mb-2">GENRES</h3>
                  <div className="flex flex-wrap gap-2">
                    {album.genres.map((genre, idx) => (
                      <span key={idx} className="px-3 py-1 bg-apple-hover rounded-full text-sm">
                        {genre}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Rating */}
              {album.rating > 0 && (
                <div>
                  <h3 className="text-sm font-semibold text-apple-textSecondary mb-2">RATING</h3>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, idx) => (
                      <svg
                        key={idx}
                        className={`w-5 h-5 ${idx < album.rating ? 'text-apple-accent' : 'text-gray-600'}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
              )}

              {/* Tracks */}
              {album.tracks && album.tracks.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold text-apple-textSecondary mb-3">TRACKS</h3>
                  <div className="space-y-1">
                    {album.tracks.map((track, idx) => {
                      const duration = Number(track.duration);
                      return (
                        <div key={idx} className="flex justify-between text-apple-text py-2 rounded px-2 -mx-2">
                          <span className="text-sm">{track.title}</span>
                          {duration > 0 && (
                            <span className="text-sm text-apple-textSecondary">
                              {formatDuration(duration)}
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* YouTube Videos */}
              {album.onlineVideos && album.onlineVideos.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold text-apple-textSecondary mb-3">VIDEOS</h3>
                  <div className="space-y-2">
                    {album.onlineVideos.slice(0, 5).map((video, idx) => (
                      <a
                        key={idx}
                        href={`https://www.youtube.com/watch?v=${video.youtubeID}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-apple-accent hover:text-red-400 transition-colors text-sm"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                          <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                        </svg>
                        {video.title}
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {/* Additional Info */}
              <div className="pt-4 border-t border-apple-hover space-y-2 text-sm">
                {album['Catalog Number'] && (
                  <p className="text-apple-textSecondary">
                    <span className="font-semibold">Catalog:</span> {album['Catalog Number']}
                  </p>
                )}
                {album.Country && (
                  <p className="text-apple-textSecondary">
                    <span className="font-semibold">Country:</span> {album.Country}
                  </p>
                )}
                {album.Format && (
                  <p className="text-apple-textSecondary">
                    <span className="font-semibold">Format:</span> {album.Format}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlbumDetail;
