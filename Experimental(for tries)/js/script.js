var app = new Vue ({
    el: '#root',
    data: {
        // userSearch is the search made by the user
        userSearch: '',
        // searchResults is an array which contains the search results
        // with all of their data
        searchResults: [],
        // thisMovie takes the index of a movie
        thisShow: -1,
        genresName: [],
        selectedGenre: ''
    },

    mounted () {
        // Obtaine genres and put them in an re-usable array 
        axios
            .get('https://api.themoviedb.org/3/genre/movie/list?api_key=5401b044329392c3526c0bd5381b8550&language=it-IT')
            .then((response) => {
                const genres = response.data.genres;
                // this.genresName = this.genreInOneObj(genres);
                this.genresName = genres;
                console.log(this.genresName);
            })
    },

    methods: {
        // searchShow() call TheMovieDB API and populates searchResults array
        searchShow() {
            axios
                .get(`https://api.themoviedb.org/3/search/multi?api_key=5401b044329392c3526c0bd5381b8550&language=it-IT&query=${this.userSearch}}&page=1`)
                .then((response) => {
                    const result = response.data.results;
                    this.searchResults = result;
                    console.log(result);
                    

                    // const newArray = this.searchResults.map((element) => {

                    // })
                });
        },


        // getMediaType() improves the details in media_type and
        // translates them in italian
        getMediaType(type) {
            if (type == 'movie') {
                return 'film'
            } else if (type == 'tv') {
                return 'serie TV'
            }
        },

        // getShowIndex provides the index of shows
        getShowIndex(index) { 
                this.thisShow = index;
                console.log(this.thisShow)
        },


        // forgotShowIndex brings back index to undefined for shows
        forgotShowIndex() {
            this.thisMovie = -1;
        },


        // voteInStars() transfrom the original vote from 1 to 10 to 1 to 5
        // without decimals
        voteInStars(vote) {
            const halfVote = vote / 2;
            let voteIn5 = this.roundUp(halfVote, 0);
            return voteIn5;
        },

        // roundUp is a working function used to round up a number
        roundUp(num, precision) {
                precision = Math.pow(10, precision)
                return Math.ceil(num * precision) / precision
        },

        // genreInOneObj(array) {
        //     let genresSimple = {};
        //     array.forEach(element => {
        //         genresSimple[element.id] = element.name;
        //     })
        //     return genresSimple;            
        // },
        

        // for( let key in this.genresName) {
        //     console.log(key)
        // }

    },

});