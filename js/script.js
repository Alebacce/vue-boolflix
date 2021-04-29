var app = new Vue ({
    el: '#root',
    data: {
        // results contiene i risultati della ricerca
        results: [],
    },

    mounted () {
        axios
            .get('https://api.themoviedb.org/3/search/movie?api_key=5401b044329392c3526c0bd5381b8550&language=it-IT&query=pokemon&page=1')
            .then((response) => {
                const result = response.data.results;
                console.log(result);
                this.results = result;

            })
    },

    methods: {
        
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