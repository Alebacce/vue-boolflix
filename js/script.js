var app = new Vue ({
    el: '#root',
    data: {
        // userSearch is the search made by the user
        userSearch: '',
        // searchResults is an array which contains the search results
        // with all of their data
        searchResults: [],
        
    },

    methods: {
        // searchShow() call TheAovieDB API and populates searchResults array
        searchShow() {
            axios
            .get(`https://api.themoviedb.org/3/search/multi?api_key=5401b044329392c3526c0bd5381b8550&language=it-IT&query=${this.userSearch}}&page=1`)
            .then((response) => {
                const result = response.data.results;
                this.searchResults = result;
            })
        },

        // voteInStars() transfrom the original vote from 1 to 10 to 1 to 5
        // without decimals
        voteInStars(vote) {
            const halfVote = vote / 2;
            let voteIn5 = this.roundUp(halfVote, 0);
            console.log(voteIn5);
            return voteIn5;
        },

        // roundUp is a working function used to round up a number
        roundUp(num, precision) {
                precision = Math.pow(10, precision)
                return Math.ceil(num * precision) / precision
        }

        
    },

});