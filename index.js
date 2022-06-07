let selectedMovie = [];
let movieList = [];

const searchBtn = document.getElementById("search-btn");
const input = document.getElementById("input");
const moviesEl = document.getElementById("movies");

const formEl = document.getElementById("searchbar");

searchBtn.addEventListener("click", function (e) {
  e.preventDefault();

  fetch(`https://www.omdbapi.com/?s=${input.value}&apikey=c35d91f`)
    .then((res) => res.json())
    .then((data) => {
      const movieList = data.Search.map((item) => {
        return item.imdbID;
      });
      console.log(movieList);
      renderMovieList(movieList);
    })
    .catch(
      (error) =>
        (moviesEl.innerHTML = `<h3 class="placeholder-text">Sorry, Movie not found!</h3>`)
    );
});

function renderMovieList(movieList) {
  const searchResult = [];
  movieList.map((id) => {
    fetch(`https://www.omdbapi.com/?i=${id}&apikey=c35d91f`)
      .then((res) => res.json())
      .then((data) => {
        searchResult.push(data);
        selectedMovie = [...searchResult];
        console.log(selectedMovie);
        const html = searchResult.map((movie) => {
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
                       <p><button class="add-btn" onclick="addMovielist('${movie.imdbID}')" id="watchlist-btn"><i class="fa fa-plus-circle" aria-hidden="true"></i>WatchList</button></p>
                   </div>
                   <p class="plot">${movie.Plot}</p>
               </div>
           </div>
           `;
        });
        moviesEl.innerHTML = html;
      });
  });
}

function addMovielist(movieId) {
  const saveMovie = selectedMovie.find((movie) => movie.imdbID === movieId);
  movieList.push(saveMovie);
  localStorage.setItem("movieList", JSON.stringify(movieList));
}

// searchBtn.addEventListener("click", async function (e) {
//   e.preventDefault();

//   try {
//     const response = await fetch(
//       `http://www.omdbapi.com/?s=${input.value}&apikey=c35d91f`
//     );
//     const data = await response.json();
//     const movieId = data.Search.map((item) => {
//       return item.imdbID;
//     });
//     renderMovieList(movieId);
//   } catch (err) {
//     moviesEl.innerHTML = `<h2>Sorry, Movie not found</h2>`;
//   }
// });

// for (let i = 0; i < dataArr.length; i++) {
//   movieTitle += `<h3 class='movie-title'>${dataArr[i].Title}</h3>`;
// }

//     for (let movie of movieId) {
//       movieInfo += `
//       <img src=${movie.Poster}/>
//       <div class="movie-info">
//         <div class="movie-header">
//           <h3 class='movie-title'>${movie.Title}</h3>
//           <p class="movie-rating">${movie.Ratings}</p>
//         </div>
//         <div>
//           <p class="movie-runtime"><${movie.Runtime}/p>
//           <p class="movie-genre">${movie.Genre}</p>
//           <p>Watchlist</p>
//        </div>
//         <p class="movie-desc">${movie.Plot}</p>
//       </div>
//         `;
//     }
//     // console.log(movie);

//     // movies.textContent = `;
//     // <img src=${dataArr.title}/>
//     // <div class="movie-info">
//     //  <div class="movie-header">
//     //    <h3 class="movie-title">${}</h3>
//     //    <p class="movie-punct">${}</p>
//     //  </div>
//     //  <div>
//     //    <p class="movie-dur"><${}/p>
//     //    <p class="movie-type">${}</p>
//     //    <p>Watchlist</p>
//     //  </div>
//     //  <p class="movie-desc">${}</p>
//     // `
//     moviesEl.innerHTML = movieInfo;
//   });
// }
