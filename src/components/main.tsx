import MoviesList from './movies';
import PromoFilm from './promo-film';
import Genres from './genre';
import Footer from './footer';
import { useDispatch, useSelector } from 'react-redux';
import { InitialState } from '../store/state';
import { useEffect } from 'react';
import { showMore, setMoviesByGenre } from '../store/action';
import { ShowMore } from './show-more';
import { FilmDispatch } from '../store';
import { fetchMovies } from '../store/api-action';
import { LoadingScreen } from '../pages/loading-screen';


type MainPageProps = {
  promoFilmTitle: string;
  promoFilmGenre: string;
  promoFilmReleaseDate: string;
}


function MainPage({ promoFilmTitle, promoFilmGenre, promoFilmReleaseDate }: MainPageProps) {
  const dispatch = useDispatch<FilmDispatch>();
  const { genre, allFilms, displayedFilmsCount, filteredFilms, isLoading } = useSelector((state: InitialState) => state.films);

  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch]);

  useEffect(() => {
    if (genre === 'All genres') {
      dispatch(setMoviesByGenre(allFilms));
    } else {
      dispatch(setMoviesByGenre(allFilms.filter((film) => film.genre === genre)));
    }
  }, [genre, allFilms, dispatch]);

  if (isLoading) {
    return LoadingScreen();
  }

  const handleShowMoreClick = () => {
    dispatch(showMore());
  };

  return (
    <>
      <PromoFilm
        title={promoFilmTitle}
        genre={promoFilmGenre}
        releaseDate={promoFilmReleaseDate}
        backgroundUrl='img/bg-the-grand-budapest-hotel.jpg'
        posterUrl='img/the-grand-budapest-hotel-poster.jpg'
        avatarUrl='img/avatar.jpg'
      />


      <div className='page-content'>
        <section className='catalog'>
          <h2 className='catalog__title visually-hidden'>Catalog</h2>

          <Genres />

          <MoviesList films={filteredFilms.slice(0, displayedFilmsCount)} />

          <ShowMore
            onShowMoreClick={handleShowMoreClick}
            visible={displayedFilmsCount < filteredFilms.length}
          />
        </section>
        <Footer />
      </div>
    </>
  );
}

export default MainPage;
