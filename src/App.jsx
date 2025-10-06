import {useEffect, useMemo, useState} from 'react';
import AlbumGrid from './components/AlbumGrid';
import AlbumDetail from './components/AlbumDetail';
import SearchBar from './components/SearchBar';
import FilterPanel from './components/FilterPanel';
import {getUniqueGenres, parseCSV} from './utils/csvParser';

function App() {
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [sortBy, setSortBy] = useState('title');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const loadAlbums = async () => {
      try {
        const data = await parseCSV('/MusicBuddy.csv');
        setAlbums(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    loadAlbums();
  }, []);

  const genres = useMemo(() => getUniqueGenres(albums), [albums]);

  const filteredAndSortedAlbums = useMemo(() => {
    let filtered = albums;

    // Search filter
    if (searchTerm) {
      const lowerSearch = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (album) =>
          album.Title?.toLowerCase().includes(lowerSearch) ||
          album.Artist?.toLowerCase().includes(lowerSearch) ||
          album.genres.some(g => g.toLowerCase().includes(lowerSearch))
      );
    }

    // Genre filter
    if (selectedGenre) {
      filtered = filtered.filter((album) =>
        album.genres.includes(selectedGenre)
      );
    }

    // Sort
      return [...filtered].sort((a, b) => {
        switch (sortBy) {
            case 'artist':
                return (a.Artist || '').localeCompare(b.Artist || '');
            case 'year':
                return (b.releaseYear || '0').localeCompare(a.releaseYear || '0');
            case 'rating':
                return (b.rating || 0) - (a.rating || 0);
            case 'title':
            default:
                return (a.Title || '').localeCompare(b.Title || '');
        }
    });
  }, [albums, searchTerm, selectedGenre, sortBy]);

  if (loading) {
    return (
      <div className="min-h-screen bg-apple-bg flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-apple-accent mx-auto mb-4"></div>
          <p className="text-apple-textSecondary">Loading collection...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-apple-bg flex items-center justify-center">
        <div className="text-center">
          <p className="text-apple-accent text-xl mb-2">Error loading collection</p>
          <p className="text-apple-textSecondary">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-apple-bg">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-apple-bg bg-opacity-95 backdrop-blur-lg border-b border-apple-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-4xl font-bold text-apple-text">Vinyl Collection</h1>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="md:hidden p-2 text-apple-text hover:text-apple-accent transition-colors"
              aria-label="Toggle filters"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
            </button>
          </div>
          <div className={`space-y-4 ${showFilters ? '' : 'hidden'} md:block`}>
            <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
            <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4">
              <FilterPanel
                genres={genres}
                selectedGenre={selectedGenre}
                onGenreChange={setSelectedGenre}
                sortBy={sortBy}
                onSortChange={setSortBy}
              />
              <div className="text-apple-textSecondary text-sm">
                {filteredAndSortedAlbums.length} album{filteredAndSortedAlbums.length !== 1 ? 's' : ''}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AlbumGrid
          albums={filteredAndSortedAlbums}
          onAlbumClick={setSelectedAlbum}
        />
      </main>

      {/* Album Detail Modal */}
      {selectedAlbum && (
        <AlbumDetail
          album={selectedAlbum}
          onClose={() => setSelectedAlbum(null)}
        />
      )}
    </div>
  );
}

export default App;
