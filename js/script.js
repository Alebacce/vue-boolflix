var app = new Vue ({
    el: '#root',
    data: {
        // userSearch è la ricerca dell'utente collegata con una v-model
        userSearch: '',
        // searchResults contiene i risultati della ricerca
        searchResults: [],
        showVote: 0,
        // thisShow: 0
        
    },

    mounted () {
        

        // setTimeout ( () => {
        //         this.contacts[sentActiveContact].messages.push(
        //         {
        //             date: this.completeDate,
		// 			day: this.today,
		// 			hour: this.lastAccess,
        //             text: 'Bellissimo messaggio!',
        //             status: 'received',
		// 			isRead: true,
        //         }
        //     )}, 1000)
        // },
    },

    methods: {
        searchMovie() {
            axios
            .get(`https://api.themoviedb.org/3/search/multi?api_key=5401b044329392c3526c0bd5381b8550&language=it-IT&query=${this.userSearch}}&page=1`)
            .then((response) => {
                const result = response.data.results;
                this.searchResults = result;
            })
            // this.voteToStar()
            // console.log('In searchMovie', this.showVote);
            let defVote = this.voteToStar(this.showVote);
            console.log(defVote)
            
            
        },

        voteToStar(vote) {
            // Itero l'array dei risultati di ricerca per ottenere  i
            // suoi elements interni
            if ( this.searchResults.length > 0) {
                this.searchResults.forEach((element, index) => {
                // Mi salvo l'elemento in una variabile
                let thisShow = element[index];
                console.log('thisShow nella funzione',thisShow);

                // Salvo il voto dello show in una variabile
                let showVote1To10 = thisShow[index].vote_average;
                // Divido il voto per due
                let showVoteHalf = showVote1To10 / 2;
                // Lo arrotondo per decimale
                let voteRoundedUp = this.roundUp(showVoteHalf, 0);
                vote = voteRoundedUp;
                // Ritorno il voto in decimali
                return vote;
                });
            }
                // this.showVote = voteRoundedUp;
                // console.log('Nella funzione', this.showVote);
            //     this.thisShow = index
            // let showVote = this.searchResults[this.thisShow].vote_average;
            // let showVoteHalf = showVote / 2;

            // let voteRoundedUp = this.roundUp(showVoteHalf, 0);
            // this.showVote = voteRoundedUp;
            // console.log('Nella funzione', this.showVote);
            },

        roundUp(num, precision) {
                precision = Math.pow(10, precision)
                return Math.ceil(num * precision) / precision
                }
        
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