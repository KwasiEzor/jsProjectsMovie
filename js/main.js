const API_KEY = 'e49595819386791d5723b1fdd62ccb6c';
const API_URL = `https://api.themoviedb.org/3/movie/550?api_key=${API_KEY}`;
const URL = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${API_KEY}`;
let movies = [];
const IMG_PATH = `https://image.tmdb.org/t/p/w1280`;
async function getMovies(url){
     const res = await fetch(url);
     const resData = await res.json();
     console.log(resData);
     movies = resData.results;
     console.log(movies);
   
    showMovies(movies)
    }

 //getMovies(API_URL);
 //getMovies(URL);


 function getElementByRate(vote){
     if(vote>=8){
         return 'green';
     }else if(vote >=5){
         return 'orange';
     }else{
         return 'red';
     }
 }
 // function that fetches movies by genres
 async function fetchMoviesGenres(){
     const fetchUrl = `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`;
     const res = await fetch(fetchUrl);
     const resData = await res.json();
    console.log(resData.genres);
    const movieList =document.querySelector('.movie__list');
    
    for (let i = 0; i<resData.genres.length; i++){
        let genresItem = resData.genres[i];
        movieList.innerHTML += `
            <li class="list__item" data-id = "${genresItem.id}">${genresItem.name}</li>
        `;
    }
    
 }
 
 // fetch movies by genres

 const SEARCH_API = `https://api.themoviedb.org/3/search/movie?&api_key=e49595819386791d5723b1fdd62ccb6c&query=`;
 const GENRES_API = `https://api.themoviedb.org/3/search/movie?&api_key=e49595819386791d5723b1fdd62ccb6c&genre=`;

 getMoviesByGenres(28);
 // function get movies by genres

 async function getMoviesByGenres(genre){
    const res  = await fetch(GENRES_API+genre)
    const resData = await res.json()
    let movies = resData;
    console.log(movies)
}
 fetchMoviesGenres()
 let movieDiv;
 const mainContainer = document.querySelector('#main_container');

 mainContainer.addEventListener('click',function(e){
     //console.log(e.target)
      movieDiv = e.target;
      console.log(movieDiv)
 })
 

 async function fetchMovies(url){
     const res = await fetch(url);
     const resData = await res.json();
     let = movies;
     movies = resData.results;
     return movies;
     
 }
 //fetchMovies(URL);

 function searchMovies(url){
     
     getMovies(url)
 }
 
 const form = document.querySelector('#form');
 const search = document.querySelector('#search');
 const searchIcon = document.querySelector('.fa-search');
 let main = document.querySelector('main');
    main = '';
console.log(form)
console.log(search)
console.log(searchIcon)
// adding event on the search input
searchIcon.addEventListener('click',function(){
    let keyword = search.value;
    if(keyword==''){
         getMovies(URL);
    }else{
        
        searchMovies(SEARCH_API+keyword);
    }
})
search.addEventListener('submit',function(e){
    e.preventDefault();
    searchMovies(SEARCH_API+keyword);
})

 function showMovies(movies){
    movies.forEach(movie =>{
        console.log(movie)
        let movieEl = document.createElement('div');
        movieEl.classList.add('movie__card');
        let imgSrc = IMG_PATH+movie.poster_path ;
        let defaultImg = '../images/movie-placeholder.jpg'
        movieEl.innerHTML = `
       
           <div class="movie__img" index="${movie.id}">
               <img src = "${IMG_PATH}${movie.poster_path}" index="${movie.id}" >
           </div>
           <div class="description">
           <h5>${movie.title}</h5>
           <p class="movie__Rate">Rate :<span class="${getElementByRate(movie.vote_average)}"> ${movie.vote_average}</span></p>
           <span class="details">Learn More</span>
           </div>
           <div class="overview">${movie.overview}</div>
        
        `;
        document.querySelector('main').appendChild(movieEl);
        
        // let btn = document.querySelector('.details')
        // btn.addEventListener('click',function(e){
        //         alert('OK')
        // })
      
        
    })
 }