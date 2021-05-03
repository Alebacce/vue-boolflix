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
        genresName: []
    },

    mounted () {
        // Obtaine genres and put them in an re-usable array 
        axios
            .get('https://api.themoviedb.org/3/genre/movie/list?api_key=5401b044329392c3526c0bd5381b8550&language=it-IT')
            .then((response) => {
                const genres = response.data.genres;
                // console.log(genres);
                genres.forEach(element => {
                    let genreId = element.id;
                    let genreName = element.name;
                    // console.log(genreName);
                    this.genresName.push( 
                        {
                            id: genreId, 
                            name: genreName
                        }
                    );
                });
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

                    const newArray = this.searchResults.map ((element) => {
                        // console.log('array searcresults element', element.genre_ids);
                        let objectResults = element.genre_ids;
                        console.log('objectResults', objectResults);
                        let object = element;
                        // let genres_name = {};
                        console.log('single-object', object);
                        // console.log('objectResults', objectResults);
                        // objectResults.forEach(id => {
                        //     showGenreId = objectResults.id
                        //     console.log('showGenreId', showGenreId);
                        // })

                        this.genresName.forEach(genre => {
                            // console.log('genre', genre.id);
                            if (objectResults.includes(genre.id) ) {
                                // object.genres_name = genre.name;
                                object.genres_name = [];
                                for(var key in genre) {
                                    if (key == 'name') {
                                        console.log('key', genre[key]);
                                        let keyName = genre[key];
                                        object.genres_name.push(keyName);
                                    }
                                }
                            }
                            // console.log(this.searchResults);
                        })
                        console.log(this.searchResults);
                    // })
                    // I suggest you use an array_element.map such that you can access each 
                    // individual element(object) in the first array and with a loop compare 
                    // it with objects in the second array, if at any point they match, you 
                    // grab the object from the second array, include it in the object of the 
                    // first array 

                    // this.searchResults.forEach(element => {
                    //     if(this.searchResults.element.id == this.genresName);
                    })
                    return newArray;
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

            // if (this.thisMovie != -1) {
            //     this.getMovieGenres(this.searchResults[this.thisMovie].id);
            // }

            // if (this.thisTv != -2) {
            //     this.getTvGenres(this.searchResults[this.thisTv].id);
            // }
        },

        // combineGenre(idList, idShow) {
        //     if(idList === idShow) {
                
        //     }
        // },


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
        }


    },

});