import {getAllMovies, posterUrl} from "./movies-api.js";

export function createMovieElt(movieData) {
    const movieElt = document.createElement("article");
    movieElt.classList.add("movie-item");
    movieElt.innerHTML = `
        <img src=${posterUrl(movieData.poster, "medium")} class="movie-item__poster" alt="poster of '${movieData.title}'"/>
        <div class="movie-item__info">
            <div class="movie-item__title">
                <div class="title">${movieData.title}</div>
            </div>
        </div>
    `;
    return movieElt;
    }
/*export function updateMoviesElt() {
    const moviesList = document.querySelector(".movies-list");
getAllMovies().then(films => {
    films.forEach(film => {
        const movieElt = createMovieElt(film);
        moviesList.appendChild(movieElt);
    });
}
);
}*/

/*export function updateMoviesElt() {
    
    const moviesList = document.querySelector(".movies-list");
getAllMovies().then(films => {
    //setLoading();
    films.collection.forEach(film => {
        const movieElt = createMovieElt(film);
        moviesList.appendChild(movieElt);
    });
}
    )
}*/

/*export function updateMoviesElt(page = 1) {
    setLoading();
    const moviesList = document.querySelector(".movies-list");
    getAllMovies(page).then(films => {
    updatePaginationElt(films.pagination)
    emptyElt(document.querySelector("article.movies-list"));
    films.collection.forEach(film => {
        const movieElt = createMovieElt(film);
        moviesList.appendChild(movieElt);
    });
}
    );
}*/



export function updateMoviesElt(page = 1) {
    let abortController = new AbortController();
    setLoading();
    const moviesList = document.querySelector(".movies-list");
    const params = new URLSearchParams();
    params.set("page", page);
    getAllMovies(appendSortToQuery(params), abortController).then(films => {
    abortController.abort();
    updatePaginationElt(films.pagination)
    emptyElt(document.querySelector("article.movies-list"));
    films.collection.forEach(film => {
        const movieElt = createMovieElt(film);
        moviesList.appendChild(movieElt);
    });
}
    );
}

export function createPaginationButtonElt(materialIcon, isDisabled, page) {
    const button = document.createElement("button");
    button.type = "button";
    button.classList.add("button");
    button.innerHTML = `<span class="material-symbols-outlined">${materialIcon}</span>`;
    button.disabled = isDisabled;
    button.addEventListener("click", () => {
        updateMoviesElt(page);
    });
    return button;
}

export function emptyElt(elt) {
    while (elt.firstChild) {
        elt.removeChild(elt.firstChild);
    }
}

export function updatePaginationElt(pagination) {
    const pag = document.querySelector(".pagination");
    if (pagination.last !==1)
    {
        if (pagination.current === 1)
        {
            let buttonFirstPage = createPaginationButtonElt("first_page", true, pagination.first);
            pag.appendChild(buttonFirstPage);
            let buttonNavigateBefore = createPaginationButtonElt("navigate_before", true, pagination.current-1);
            pag.appendChild(buttonNavigateBefore);
        }
        else
        {
            let buttonFirstPage = createPaginationButtonElt("first_page", false, pagination.first);
            pag.appendChild(buttonFirstPage);
            let buttonNavigateBefore = createPaginationButtonElt("navigate_before", false, pagination.current);
            pag.appendChild(buttonNavigateBefore);
        }
        let spanPagination = document.createElement("span");
        spanPagination.classList.add("pagination__info");
        spanPagination.innerHTML = `${pagination.current}/${pagination.last}`;
        pag.appendChild(spanPagination);
        if (pagination.current !== pagination.last)
        {
            let buttonNavigateNext = createPaginationButtonElt("navigate_next", false, pagination.current+1);
            pag.appendChild(buttonNavigateNext);
            let buttonLastPage = createPaginationButtonElt("last_page", false, pagination.last);
            pag.appendChild(buttonLastPage);
        }
        else
        {
            let buttonNavigateNext = createPaginationButtonElt("navigate_next", true, pagination.current+1);
            pag.appendChild(buttonNavigateNext);
            let buttonLastPage = createPaginationButtonElt("last_page", true, pagination.last);
            pag.appendChild(buttonLastPage);
        }
    }
}

export function setLoading() {
    const navPagination = document.querySelector(".pagination");
    emptyElt(navPagination);
    const moviesList = document.querySelector(".movies-list");
    moviesList.innerHTML = `<article class="loading">Loading...</article>`;
}

export function appendSortToQuery(urlSearchParams) {
    const sort = document.querySelector("input[name='sort']:checked");
    urlSearchParams.set("sort", sort.value);
    return urlSearchParams;
}

export function setSortButtonsEltsEvents() {
    const sortButtons = document.querySelectorAll("input[name='sort']");
    sortButtons.forEach(button => {
        button.addEventListener("change", () => {
            updateMoviesElt();
        });
    });
}