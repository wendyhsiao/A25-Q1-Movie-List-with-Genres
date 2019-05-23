(function () {
  const BASE_URL = 'https://movie-list.alphacamp.io'
  const INDEX_URL = BASE_URL + '/api/v1/movies/'
  const POSTER_URL = BASE_URL + '/posters/'
  const data = []
  const dataPanel = document.getElementById('data-panel')
  const genresList = document.getElementById('genres-list')
  const genres = {
    "1": "Action",
    "2": "Adventure",
    "3": "Animation",
    "4": "Comedy",
    "5": "Crime",
    "6": "Documentary",
    "7": "Drama",
    "8": "Family",
    "9": "Fantasy",
    "10": "History",
    "11": "Horror",
    "12": "Music",
    "13": "Mystery",
    "14": "Romance",
    "15": "Science Fiction",
    "16": "TV Movie",
    "17": "Thriller",
    "18": "War",
    "19": "Western"
  }

  function getGenresData(datasetGenres) {
    let results = []
    console.log('datasetGenres', datasetGenres)
    const regex = new RegExp('^' + datasetGenres, 'i')
    console.log('data', data)
    // results = data.filter(item => item.genres)
    // return results
    results = data.filter(item => item.genres.join().match(regex))
    // results = data.filter(item => item.genres.join() === datasetGenres)
    // return results 

    console.log('regex', regex)
    console.log('results', results)
    displayDataList(results)
  }

  function displayDataList(data) {
    let htmlContent = ''
    data.forEach(function (item, index) {
      htmlContent += `
        <div class="col-sm-3">
          <div class="card mb-2">
            <img  class="card-img-top" src="${POSTER_URL}${item.image}" alt="Card image cap">
            <h6 class="card-title">${item.title}</h6>
            <div><ul class="card-genres">${itemGenres(item)}</ul></div>
          </div>
        </div>
      `
      console.log('item.genres', item)
    })

    dataPanel.innerHTML = htmlContent
  }


  function itemGenres(item) {
    //   const data.genres.map(x => genres[0+1])
    let items = ''
    for (let i = 0; i < item.genres.length; i++) {
      let keys = item.genres[i]
      console.log('keys', genres[keys])

      items += `<li class="genres-items">${genres[keys]}</li>`
      // if (item.genres[i] === genres[i+1]) {
      //   console.log(OK)
      // }
    }
    return items
  }



  // function getTotalGenres (genres) {
  //   let genresItemContent = ''
  //   genres.forEach(function (item, index) {
  //     genresItemContent += `
  //       <li class="list-group-item">
  //         <a class="group-link" href="javascript:;"> ${item.values}</a>
  //       </li>
  //     `
  //   })  
  //   genresList.innerHTML = genresItemContent
  // }

  function getTotalGenres(genres) {
    let genresItemContent = ''
    let genresNumber = Object.keys(genres)
    // console.log(genresNumber.length)

    for (let i = 0; i < genresNumber.length; i++) {
      genresItemContent += `
        <li class="list-group-item">
          <a class="group-link" href="javascript:;" data-genres="${i + 1}"> ${genres[i + 1]}</a>
        </li>
      `
    }
    genresList.innerHTML = genresItemContent
  }



  axios.get(INDEX_URL)
    .then((response) => {
      data.push(...response.data.results)
      displayDataList(data)
      getTotalGenres(genres)
      console.log('data', data)
      console.log('response.data.results', response.data.results)
    }).catch((err) => console.log(err))


  genresList.addEventListener('click', event => {
    console.log(event.target.dataset.genres)
    if (event.target.tagName === 'A') {
      getGenresData(event.target.dataset.genres)

    }
  })





})()