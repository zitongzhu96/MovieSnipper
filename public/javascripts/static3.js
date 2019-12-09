if (document.getElementById('grid-nav') != null) {
  const topMovies = document.getElementById('top-movies');
  const history = document.getElementById('search-history');
  const href = window.location.href.split('/');
  const username = href[href.length - 1];
  topMovies.href = `${topMovies.href}/${username}`;
  history.href = `${history.href}/${username}`;
}
