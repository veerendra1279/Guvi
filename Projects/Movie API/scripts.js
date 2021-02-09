var url="https://www.omdbapi.com/?apikey=719bc8b8"

// var url="http://www.omdbapi.com/?apikey=719bc8b8&i=tt1588170"

var movieList=[];
var seriesList=[];

let load = async () => {
    try{
        movieList=[];
        seriesList=[];
        let keywordString=['Marvel','Batman',"Saw","kingsman","spiderman","godzilla","Sherlock","Fast and furious"]
        // let keywordString=['Marvel']

        for(let i in keywordString){
            let req  = await fetch(url+"&s="+keywordString[i]+"&type=movie");
            let data = await req.json();
            // console.log(data.Search)
            movieList= movieList.concat(data.Search);
            // console.log(data)  
        }
        // console.log(movieList)

        let keywordString1=["Breaking Bad","Game of Thrones","Money Heist","Peaky Blinders","Lucifer"]
        for(let i in keywordString1){
            let req  = await fetch(url+"&t="+keywordString1[i]+"&type=series");
            let data = await req.json();
            for(let j=1;j<=data.totalSeasons;j++){
                var req1=await fetch(url+"&t="+keywordString1[i]+"&type=series"+"&season="+j);
                var data1=await req1.json();
                seriesList.push(data1);
            } 
        }
        console.log(seriesList)
        
    }
    catch(err){
        console.error(err);
    }
}
load();

async function getMovieList(){
    displayAllMovie(movieList)
}

async function getSeriesList(){
   
    displayAllSeries(seriesList)
}

async function displayAllSeries(seriesRecord){
    try{
        var main_body = document.querySelector("#main_body");
        main_body.innerHTML=""
        
        var row = document.createElement("row");
        row.setAttribute("class","row");

        for(let i=0;i<seriesRecord.length;i++){
            var a = document.createElement("button");
            a.type="button";
            a.setAttribute("class","btn")
            a.setAttribute("id","toggleButton")
            a.setAttribute("data-toggle","modal")
            a.setAttribute("data-target","#staticBackdrop")
            // a.setAttribute("class","text-decoration-none text-dark");
            a.addEventListener("click",()=>{
                displaySeriesInfo(seriesRecord[i].Season,seriesRecord[i].Title)
            })
            var col = document.createElement("div");
            col.setAttribute("class","col-sm-4 border my-2 pt-2 text-center");

            let req = await(fetch(url+"&t="+seriesRecord[i].Title));
            let data = await req.json();

            var seriesPoster = document.createElement("img");
            seriesPoster.setAttribute("class","img1 img-fluid  rounded transition-hover")
            seriesPoster.setAttribute("src",data.Poster);
            seriesPoster.setAttribute("alt","No Poster");

            var seriesEpisodes = document.createElement("div");
            seriesEpisodes.innerHTML = `<b>Total No of Episodes : </b>${seriesRecord[i].Episodes.length}`;

            var seriesSeason = document.createElement("div");
            seriesSeason.innerHTML="<b>"+seriesRecord[i].Title+" Season "+seriesRecord[i].Season+"</b>"

            a.append(seriesPoster,seriesEpisodes,seriesSeason);
            col.append(a)
            row.append(col);
        
        }
        main_body.append(row);
    }
    catch(err){
        console.log(err);
    }
}

function displayAllMovie(movieRecord)
{
    // console.log("Filtered Movie List:")
    // for(let i=0;movieRecord.length;i++){
    //     console.log(movieRecord[i]["Title"]);
    // }
    try{
        var main_body = document.querySelector("#main_body");
        main_body.innerHTML=""
        
        var row = document.createElement("row");
        row.setAttribute("class","row");
        for(let i=0;i<movieRecord.length;i++)
        {
            var col = document.createElement("div");
            col.setAttribute("class","col-sm-4 border my-2 pt-2 text-center");

            var a = document.createElement("button");
            a.type="button";
            a.setAttribute("class","btn")
            a.setAttribute("id","toggleButton")
            a.setAttribute("data-toggle","modal")
            a.setAttribute("data-target","#staticBackdrop")
            
            // a.href="#"
            // a.setAttribute("class","text-decoration-none text-dark");
            a.addEventListener("click",()=>{
                displayMovieInfo(movieRecord[i].imdbID)
            })
            
            var moviePoster = document.createElement("img");
            moviePoster.setAttribute("class","img1 img-fluid  rounded transition-hover")
            moviePoster.setAttribute("src",movieRecord[i].Poster);
            moviePoster.setAttribute("alt","No Poster");

            var movieTitle = document.createElement("div");
            movieTitle.innerHTML = `<b>${movieRecord[i].Title}</b>`;

            var movieYear = document.createElement("div");
            movieYear.innerHTML=movieRecord[i].Year;

            a.append(moviePoster,movieTitle,movieYear);
            col.append(a)
            row.append(col);
        
        }
        main_body.append(row);
    }
    catch(err){
        console.log(err);
    }
}

async function displaySeriesInfo(season,title){
    console.log(season);

    let req = await fetch(url+"&t="+title+"&Season="+season);
    let data = await req.json();
    console.log(data);

    var titlePopup = document.querySelector(".titlePopup");
    titlePopup.innerHTML=`<b>${title}</b>`;
    var popupRow = document.getElementById("popupRow");
    popupRow.innerHTML="";

    for(let i=0;i<data.Episodes.length;i++){
        let req1=await fetch(url+"&i="+data.Episodes[i].imdbID);
        let data1=await req1.json();
        console.log(data1);

        var col = document.createElement("div");
        col.setAttribute("class","col-sm-4 border my-2 pt-2 ");

        var seriesPoster = document.createElement("img");
        seriesPoster.setAttribute("class","img1 img-fluid  rounded transition-hover popupImage text-center")
        seriesPoster.setAttribute("src",data1.Poster);
        seriesPoster.setAttribute("alt","No Poster");

        var seriesTitle = document.createElement("div");
        seriesTitle.innerHTML = `<b class='my-2'>Title: </b>${data1.Title}`;

        var seriesEpisode = document.createElement("div");
        seriesEpisode.innerHTML = `<b class='my-1'>Episode: </b>${data1.Episode}`;

        seriesActors = document.createElement("div");
        seriesActors.innerHTML = `<b class='my-1'>Actors: </b>${data1.Actors}`;

        seriesDirector = document.createElement("div");
        seriesDirector.innerHTML = `<b class='my-1'>Director: </b>${data1.Director}`

        seriesPlot = document.createElement("div");
        seriesPlot.innerHTML = `<b class='my-1'>Plot: </b>${data1.Plot}`

        seriesRating = document.createElement("div");
        seriesRating.innerHTML = `<b class='my-1'>IMDB Rating: </b>${data1.imdbRating}`

        col.append(seriesPoster,seriesTitle,seriesEpisode,seriesActors,seriesDirector,seriesRating)
        popupRow.append(col);
    }

}

async function displayMovieInfo(id){
    console.log("ID is:"+id);

    let req = await fetch(url+"&i="+id);
    let data = await req.json();
    console.log(data);

    var popupRow = document.getElementById("popupRow");
    popupRow.innerHTML="";

    
    var imgPopUp = document.getElementById("imgPopUp");
    imgPopUp.innerHTML=`<img src='${data.Poster}' class='img1 img-fluid rounded imgResponse' alt='No Poster' width=1000 height=800>`;

    var titlePopup = document.querySelector(".titlePopup")
    titlePopup.innerHTML=`<h3 class='text-center'>${data.Title}</h3>`

    var actorsPopup = document.getElementById("actorsPopup");
    actorsPopup.innerHTML=`<b>Actors: </b>${data.Actors}`;

    var directorPopup = document.getElementById("directorPopup");
    directorPopup.innerHTML=`<b>Director: </b>${data.Director}`;

    var writerPopup=document.getElementById("writerPopup");
    writerPopup.innerHTML=`<b>Writer: </b>${data.Writer}`;

    var plotPopup = document.getElementById("plotPopup");
    plotPopup.innerHTML=`<b>Movie Plot: </b>${data.Plot}`;

    var languagePopup =document.getElementById("languagePopup");
    languagePopup.innerHTML=`<b>Movie Language: </b>${data.Language}`;

    var genrePopup =document.getElementById("genrePopup");
    genrePopup.innerHTML=`<b>Genre: </b>${data.Genre}`;

    var yearPopup=document.getElementById("yearPopup");
    yearPopup.innerHTML=`<b>Year of Release: </b>${data.Year}`;

    var ratingPopup = document.getElementById("ratingPopup");
    ratingPopup.innerHTML=`<b>IMDB Rating: </b>${data.imdbRating}`

}

var searchBar = document.querySelector(".searchBar");
searchBar.addEventListener("keyup",(e)=>{
    var movieData = movieList;
    var seriesData = seriesList;
    const serachString = e.target.value.toLowerCase();
    console.log("Search string is:"+serachString);
    if(serachString.length>0){
        const filterData = movieData.filter( (rec) => {
                return rec.Title.toLowerCase().includes(serachString);
            });

        const filterData1 = seriesData.filter( (rec) => {
            return rec.Title.toLowerCase().includes(serachString);
        });
        console.log(filterData1);

        // displayAllMovie(filterData);
        // displayAllSeries(filterData1)
        diplaySearchData(filterData,filterData1);
    }
    else{
        displayAllMovie("");
    }
})

async function diplaySearchData(movieRecord,seriesRecord){
    try{
        var main_body = document.querySelector("#main_body");
        main_body.innerHTML=""
        
        var row = document.createElement("row");
        row.setAttribute("class","row");
        for(let i=0;i<movieRecord.length;i++)
        {
            var col = document.createElement("div");
            col.setAttribute("class","col-sm-4 border my-2 pt-2 text-center");

            var a = document.createElement("button");
            a.type="button";
            a.setAttribute("class","btn")
            a.setAttribute("id","toggleButton")
            a.setAttribute("data-toggle","modal")
            a.setAttribute("data-target","#staticBackdrop")
            
            // a.href="#"
            // a.setAttribute("class","text-decoration-none text-dark");
            a.addEventListener("click",()=>{
                displayMovieInfo(movieRecord[i].imdbID)
            })
            
            var moviePoster = document.createElement("img");
            moviePoster.setAttribute("class","img1 img-fluid  rounded transition-hover")
            moviePoster.setAttribute("src",movieRecord[i].Poster);
            moviePoster.setAttribute("alt","No Poster");

            var movieTitle = document.createElement("div");
            movieTitle.innerHTML = `<b>${movieRecord[i].Title}</b>`;

            var movieYear = document.createElement("div");
            movieYear.innerHTML=movieRecord[i].Year;

            a.append(moviePoster,movieTitle,movieYear);
            col.append(a)
            row.append(col);
        
        }
        // main_body.append(row);

        // var row = document.createElement("row");
        // row.setAttribute("class","row");

        for(let i=0;i<seriesRecord.length;i++){
            var a1 = document.createElement("button");
            a1.type="button";
            a1.setAttribute("class","btn")
            a1.setAttribute("id","toggleButton")
            a1.setAttribute("data-toggle","modal")
            a1.setAttribute("data-target","#staticBackdrop")
            // a.setAttribute("class","text-decoration-none text-dark");
            a1.addEventListener("click",()=>{
                displaySeriesInfo(seriesRecord[i].Season,seriesRecord[i].Title)
            })
            var col = document.createElement("div");
            col.setAttribute("class","col-sm-4 border my-2 pt-2 text-center");

            let req = await(fetch(url+"&t="+seriesRecord[i].Title));
            let data = await req.json();

            var seriesPoster = document.createElement("img");
            seriesPoster.setAttribute("class","img1 img-fluid  rounded transition-hover")
            seriesPoster.setAttribute("src",data.Poster);
            seriesPoster.setAttribute("alt","No Poster");

            var seriesEpisodes = document.createElement("div");
            seriesEpisodes.innerHTML = `<b>Total No of Episodes : </b>${seriesRecord[i].Episodes.length}`;

            var seriesSeason = document.createElement("div");
            seriesSeason.innerHTML="<b>"+seriesRecord[i].Title+" Season "+seriesRecord[i].Season+"</b>"

            a1.append(seriesPoster,seriesEpisodes,seriesSeason);
            col.append(a1)
            row.append(col);
        
        }
        main_body.append(row);
    }
    catch(err){
        console.log(err);
    }
}



