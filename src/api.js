const API = {};

API.getPhotos = () => {
    return fetch('https://jsonplaceholder.typicode.com/photos')
    .then(resp =>resp.json());
};