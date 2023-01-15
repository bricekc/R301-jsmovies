export const API_URL = "http://movies-api";

/*export function getAllMovies() {
    return fetch(`${API_URL}/movies`).then((response) => response.json());
    }*/

/*export function getAllMovies() {
    return fetch(`${API_URL}/movies`).then((response) => extractCollectionAndPagination(response));
    }*/
/*export function getAllMovies(page = 1) {
        if (!(page instanceof URLSearchParams)) {
            return Promise.reject(new Error("Invalid parameter type"));
        }
        return fetch(`${API_URL}/movies?${page}`).then((response) => extractCollectionAndPagination(response));
        }*/

export function getAllMovies(page = 1, abortController = new AbortController()) {
    if (!(page instanceof URLSearchParams)) {
        return Promise.reject(new Error("Invalid parameter type"));
    }
    return fetch(`${API_URL}/movies?${page}`, {signal: abortController.signal}).then((response) => extractCollectionAndPagination(response));
    }
    
export function posterUrl(imagePath, size = 'original') {
    return `${API_URL}${imagePath}/${size}`;
    }

export function extractPaginationFromHeaders(response) {
    return {
        current: parseInt(response.headers.get("Pagination-Current-Page")),
        last: parseInt(response.headers.get("Pagination-Last-Page")),
    };
    }

export function extractCollectionAndPagination(response) {
    return response.json().then((collection) => {
        return {
            collection,
            pagination: extractPaginationFromHeaders(response),
        };
    });
    }