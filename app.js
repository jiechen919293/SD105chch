const getMovies = async (keyWord)=>{
  const movieUrl = "http://www.omdbapi.com/?s="+keyWord+"&apikey=bad05635";
  console.log(movieUrl)
  const response = await fetch(movieUrl);
  const data = await response.json();

  if (response.status != 200){
    throw new err ("Can't get data");
  }

  return data;
}

const getPlot =  async (imdbID)=>{
  const plotURL = "http://www.omdbapi.com/?i="+imdbID+"&apikey=bad05635";
  const response = await fetch(plotURL);
  const data = await response.json();

  if (response.status != 200){
    throw new err ("Can't get data");
  }

  return data;
}

const moviesList = document.getElementById("movies");
const searchInput = document.getElementById("search");



searchInput.addEventListener("keydown",function(e){
  if (e.keyCode == 13){
    let keyWord = searchInput.value;
    getMovies(keyWord).then((data)=>{
      moviesList.innerHTML="";
      data.Search.forEach(element => {
        getPlot(element.imdbID).then((data)=>{
          moviesList.insertAdjacentHTML('beforeend',`
        <li class="movie">
          <img class="movie-poster" src="${data.Poster}" alt="">
          <div class="overlay">
           <h3 class="movie-title">${data.Title}</h3>
           <p class="rate">${data.Ratings[0].Value}</p>
           <p class="movie-plot">${data.Plot}</p>
          </div>
        </li>`)
        }).catch((err)=>console.log(err));
        
        
      });
      searchInput.value = "";
    }).catch((err)=>console.log(err))
  }

  
})

