import Papa from 'papaparse';

export const parseCSV = async (filePath) => {
  try {
    const response = await fetch(filePath);
    const csvText = await response.text();

    return new Promise((resolve, reject) => {
      Papa.parse(csvText, {
        header: true,
        skipEmptyLines: true,
        transformHeader: (header) => header.trim(),
        transform: (value) => value.trim(),
        complete: (results) => {
          const albums = results.data.map((row) => {
            // Parse JSON fields
            let tracks = [];
            let onlineVideos = [];

            try {
              if (row.Tracks) {
                tracks = JSON.parse(row.Tracks);
              }
            } catch (e) {
              console.warn('Failed to parse tracks for:', row.Title);
            }

            try {
              if (row['Online Videos']) {
                onlineVideos = JSON.parse(row['Online Videos']);
              }
            } catch (e) {
              console.warn('Failed to parse online videos for:', row.Title);
            }

            return {
              ...row,
              tracks,
              onlineVideos,
              rating: parseFloat(row.Rating) || 0,
              favorites: parseInt(row.Favorites) || 0,
              releaseYear: row['Release Year'] || row['Original Release Year'] || 'Unknown',
              genres: row.Genres ? row.Genres.split(',').map(g => g.trim()) : [],
              styles: row.Styles ? row.Styles.split(',').map(s => s.trim()) : [],
            };
          });

          resolve(albums);
        },
        error: (error) => {
          reject(error);
        }
      });
    });
  } catch (error) {
    console.error('Error loading CSV:', error);
    throw error;
  }
};

export const getUniqueGenres = (albums) => {
  const genresSet = new Set();
  albums.forEach(album => {
    album.genres.forEach(genre => genresSet.add(genre));
  });
  return Array.from(genresSet).sort();
};

export const getUniqueYears = (albums) => {
  const yearsSet = new Set();
  albums.forEach(album => {
    if (album.releaseYear && album.releaseYear !== 'Unknown') {
      yearsSet.add(album.releaseYear);
    }
  });
  return Array.from(yearsSet).sort();
};
