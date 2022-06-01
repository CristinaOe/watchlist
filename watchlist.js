let movieList = [];
const moviesEl = document.getElementById("movies");

getMovieList();

function getMovieList() {
  movieList = JSON.parse(localStorage.getItem("movieList"));
  let html = "";
  if (movieList.length > 0) {
    html = movieList.map((movie) => {
      return `
          
          <div class="movie-container">
               <div class="poster">
                   <img class="movie-img" src=${movie.Poster} alt=""/>
               </div>
               <div class="movie-info">
                   <h2 class="movie-title">${movie.Title} <span class="rating"><i id="star" class="fa fa-star" aria-hidden="true"></i>${movie.imdbRating}</span></h2>
                   <div class="movie-details">
                       <p class="movie-runtime">${movie.Runtime}</p>
                       <p class="movie-genre">${movie.Genre}</p>
                       <p><button onclick="removeMovie('${movie.imdbID}')" id="remove-btn"><i class="fa-solid fa-circle-minus" aria-hidden="true"></i>Remove</button></p>
                   </div>
                   <p class="plot">${movie.Plot}</p>
               </div>
           </div>
           `;
    });
  } else {
    html = `
        <div class="placeholder-text">
          <h3>Your watchlist is looking a little empty...</h3>
          <p class="add-movies">
            <a href="index.html"
              ><i class="fa fa-plus-circle" aria-hidden="true"></i>Let's add some
              movies!</a
            >
          </p>
        </div>`;
  }

  moviesEl.innerHTML = html;
}

function removeMovie(movieId) {
  const selectedMovie = movieList.find((movie) => movie.imdbID === movieId);
  const index = movieList.indexOf(selectedMovie);
  movieList.splice(index, 1);

  localStorage.setItem("movieList", JSON.stringify(movieList));
  getMovieList();
}
