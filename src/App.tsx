import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import ReactPaginate from "react-paginate";
import { fetchMovies } from "./services/movieService";
import type { Movie } from "./types/movie";
import SearchBar from "./components/SearchBar/SearchBar";
import MovieGrid from "./components/MovieGrid/MovieGrid";
import Loader from "./components/Loader/Loader";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import MovieModal from "./components/MovieModal/MovieModal";
import toast, { Toaster } from "react-hot-toast";
import css from "./App.module.css";

function App() {
  const [query, setQuery] = useState<string>("");
  const [page, setPage] = useState<number>(1);

  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  // === REACT QUERY ===
  const { data, isLoading, isError } = useQuery({
    queryKey: ["movies", query, page],

    queryFn: () => fetchMovies(query, page),

    enabled: !!query,
  });

  useEffect(() => {
    if (isError) {
      toast.error("Щось пішло не так при завантаженні фільмів!");
    }
  }, [isError]);

  // === HANDLERS ===
  const handleSearch = (newQuery: string) => {
    if (newQuery === query) return;
    setQuery(newQuery);
    setPage(1);
  };

  const handlePageClick = ({ selected }: { selected: number }) => {
    setPage(selected + 1);

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const openModal = (movie: Movie) => setSelectedMovie(movie);
  const closeModal = () => setSelectedMovie(null);

  const totalPages = data?.total_pages || 0;
  const movies = data?.results || [];

  return (
    <div>
      <Toaster position="top-right" />

      <SearchBar onSubmit={handleSearch} />

      {isLoading && <Loader />}
      {isError && <ErrorMessage />}

      {!isLoading && !isError && movies.length > 0 && (
        <>
          <MovieGrid movies={movies} onSelect={openModal} />

          {totalPages > 1 && (
            <ReactPaginate
              breakLabel="..."
              nextLabel="→"
              previousLabel="←"
              pageCount={totalPages}
              onPageChange={handlePageClick}
              pageRangeDisplayed={5}
              marginPagesDisplayed={1}
              forcePage={page - 1}
              containerClassName={css.pagination}
              activeClassName={css.active}
              disabledClassName={css.disabled}
            />
          )}
        </>
      )}

      {!isLoading && !isError && query && movies.length === 0 && (
        <p style={{ textAlign: "center" }}>No movies found</p>
      )}

      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={closeModal} />
      )}
    </div>
  );
}

export default App;
