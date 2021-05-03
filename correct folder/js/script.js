var app = new Vue ({
    el: '#root',
    data: {
        // userSearch is the search made by the user
        userSearch: '',
        userLanguage: 'it-IT',
        apiKey: '5401b044329392c3526c0bd5381b8550',
        // searchResults is an array which contains the search results
        // with all of their data
        searchResults: [],
        // thisMovie takes the index of a movie
        thisShow: -1,
        genresName: [],
        arrayProva: []
    },

    mounted () {
        // Obtaine genres and put them in an re-usable array 
        axios
            .get(`https://api.themoviedb.org/3/genre/movie/list`, {
                params: {
                            api_key: this.apiKey,
                            language: this.userLanguage,
                        },
            })
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
                .get(`https://api.themoviedb.org/3/search/multi`, {
                params: {
                            api_key: this.apiKey,
                            query: this.userSearch,
                            language: this.userLanguage,
                        },
                })
                .then((response) => {
                    const result = response.data.results;
                    this.searchResults = result;
                    console.log(result);

                    // I insert a new property inside the array obtained right now,
                    // this property provides me genres name
                    const newArray = this.searchResults.map ((element) => {
                        let objectResults = element.genre_ids;
                        let object = element;
                        // object.genres_name it's an empty array where I saves in my results
                        object.genres_name = [];
                        this.genresName.forEach(genre => {
                            // ids of genres are the same everywhere. If the ones in the 
                            // genresName array are included in each element.genre_ids
                            // then push the name as an object, so it's printable in HTML
                            if (objectResults.includes(genre.id) ) {
                                object.genres_name.push(
                                    {
                                        genre: genre.name
                                    
                                    }    
                                    );
                            }
                        }) 
                    
                    // return the element updated
                    return object;
                    })
                    // this.arrayProva is now equal to the map of the original array and it's
                    // the array printed in HTML
                    this.arrayProva = newArray;

                    //------- ORIGINAL HELP CAMNE FROM STACK OVERFLOW---------------------
                    // I suggest you use an array_element.map such that you can access each 
                    // individual element(object) in the first array and with a loop compare 
                    // it with objects in the second array, if at any point they match, you 
                    // grab the object from the second array, include it in the object of the 
                    // first array
                    // --------------------------------------------------------------------
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
        }


    },

});