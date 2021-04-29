var app = new Vue ({
    el: '#root',
    data: {
        // userSearch è la ricerca dell'utente collegata con una v-model
        userSearch: '',
        // movieResults contiene i risultati della ricerca relativi ai film
        movieResults: [],
        // tvShowsResults contiene i risultati della ricerca relativi ai film
        tvShowsResults: [],
        
    },

    mounted () {
        
    },

    methods: {
        searchMovie() {
            // console.log(this.userSearch);

            axios
            .get(`https://api.themoviedb.org/3/search/movie?api_key=5401b044329392c3526c0bd5381b8550&language=it-IT&query=${this.userSearch}}&page=1`)
            .then((response) => {
                const result = response.data.results;
                // console.log(result);
                this.movieResults = result;
            })

            axios
            .get(`https://api.themoviedb.org/3/search/tv?api_key=5401b044329392c3526c0bd5381b8550&language=it-IT&query=${this.userSearch}}&page=1`)
            .then((response) => {
                const result = response.data.results;
                // console.log(result);
                this.tvShowsResults = result;
            })
        },

        
    },

});



//OLD STUFF

// ------------------------------------------------
// ESEMPIO NAVIGAZIONE ARRAY DI RICERCA E OTTENIMENTO DI UN DAT
// PARAMETRO, IL TITOLO IN QUESTO CASO
//
// const result = response.data.results;
// console.log(result);
// result.forEach(element => {
//     let title = element.title;
//     console.log(title);
// });
// ------------------------------------------------




// ------------------------------------------------
// DELETED Data
// languages:[],
// selectedCountry: 1
// ------------------------------------------------




// ------------------------------------------------
// API REST Countries
//
// axios
//     .get('https://restcountries.eu/rest/v2/all')
//     .then((response) => {
//         const countriesArray = response.data;
//         countriesArray.forEach(element => {
//             let languageArray = element.languages;
//             let languages = languageArray[0].iso639_1;
//             // console.log(languages);

//             this.languages.push(languages);
//         });
//     })
    // .iso639_1

    // console.log(this.languages);
// ------------------------------------------------




// ------------------------------------------------
// getFlag() {
        //     this.movieResults.forEach((element) => {
        //         let movieCountry = element.original_language;
        //         console.log(movieCountry);
        //         if (movieCountry.includes(this.languages.element) ) {
        //         alert('yes')
        //         }
        //     })
        // }
// ------------------------------------------------