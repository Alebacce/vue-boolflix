var app = new Vue ({
    el: '#root',
    data: {
        // userSearch is the search made by the user
        userSearch: '',
        // searchResults is an array which contains the search results
        // with all of their data
        searchResults: [],
        // thisMovie takes the index of a movie
        thisMovie: -1,
        // thisTv takes the index of a tv shows
        thisTv: -2,
        // movieGenre contains all the genres for the movie on hover
        movieGenre: [],
        // tvGenre contains all the genres for the tv show on hover
        tvGenre: [],
    },

    methods: {
        // searchShow() call TheMovieDB API and populates searchResults array
        searchShow() {
            axios
                .get(`https://api.themoviedb.org/3/search/multi?api_key=5401b044329392c3526c0bd5381b8550&language=it-IT&query=${this.userSearch}}&page=1`)
                .then((response) => {
                    const result = response.data.results;
                    this.searchResults = result;
                })
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
            if (this.searchResults[index].media_type == 'movie') {
                this.thisMovie = index;
            } else if (this.searchResults[index].media_type == 'tv') {
                this.thisTv = index;
                console.log('this.thisTv', this.thisTv);
            }

            if (this.thisMovie != -1) {
                this.getMovieGenres(this.searchResults[this.thisMovie].id);
            }

            if (this.thisTv != -2) {
                this.getTvGenres(this.searchResults[this.thisTv].id);
            }
        },


        // forgotShowIndex brings back index to undefined for shows
        forgotShowIndex() {
            this.thisMovie = -1;
            this.movieGenre = [];
            this.thisTv = -2;
            this.tvGenre = [];
        },

        // getMovieGenres provides movie genres via ID
        getMovieGenres(id) {
            axios
                .get(`https://api.themoviedb.org/3/movie/${id}?api_key=5401b044329392c3526c0bd5381b8550&language=it-IT&`)
                .then((response) => {
                    const result = response.data.genres;
                    result.forEach(element => {
                        let genreNames = element.name;
                        if (!this.movieGenre.includes(genreNames))
                        this.movieGenre.push(genreNames);
                    });
                })
        },

        // getTvGenres provides TV shows genres via ID
        getTvGenres(id) {
            axios
                .get(`https://api.themoviedb.org/3/tv/${id}?api_key=5401b044329392c3526c0bd5381b8550&language=it-IT`)
                .then((response) => {
                    const risultato = response.data.genres;
                    console.log('generi tv', risultato);

                    risultato.forEach(element => {
                        let genreNames = element.name;
                        if (!this.tvGenre.includes(genreNames))
                        this.tvGenre.push(genreNames);
                    });

                    console.log(this.tvGenre);
                })
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
        }


    },

});