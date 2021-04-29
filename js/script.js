var app = new Vue ({
    el: '#root',
    data: {
        // userSearch è la ricerca dell'utente collegata con una v-model
        userSearch: '',
        // results contiene i risultati della ricerca
        movieResults: [],
        tvShowsResults: [],
    },

    mounted () {
        
    },

    methods: {
        searchMovie() {
            console.log(this.userSearch);

            axios
            .get(`https://api.themoviedb.org/3/search/movie?api_key=5401b044329392c3526c0bd5381b8550&language=it-IT&query=${this.userSearch}}&page=1`)
            .then((response) => {
                const result = response.data.results;
                console.log(result);
                this.movieResults = result;
            })

            axios
            .get(`https://api.themoviedb.org/3/search/tv?api_key=5401b044329392c3526c0bd5381b8550&language=it-IT&query=${this.userSearch}}&page=1`)
            .then((response) => {
                const result = response.data.results;
                console.log(result);
                this.tvShowsResults = result;
            })
        }
    },

});

// ESEMPIO NAVIGAZIONE ARRAY DI RICERCA E OTTENIMENTO DI UN DAT
// PARAMETRO, IL TITOLO IN QUESTO CASO
//
// const result = response.data.results;
// console.log(result);
// result.forEach(element => {
//     let title = element.title;
//     console.log(title);
// });