/* eslint-disable max-len */
// Add username to href of all page elements
if (document.getElementById('grid-nav') != null) {
  const topMovies = document.getElementById('top-movies');
  const history = document.getElementById('search-history');
  const href = window.location.href.split('/');
  const username = href[href.length - 1];
  history.href = `${history.href}/${username}`;
}

