import axios from "axios";

const fetchInfoById = (id) => {
    return axios.get(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`);
};

// Using Promise.all to call the API concurrently
const fetchAllItems = async (ids, errorCallback) => {
    try {
        // Pass a function to map
        const requests = ids.map(id => {
            return fetchInfoById(id)
        });

        // Wait for all the requests to complete
        const responses = await Promise.all(requests);

        // Return the result of each request
        return responses.map(response => response.data);
    } catch (error) {
        console.error('Error fetching data:', error);
        // call error callback function
        errorCallback && errorCallback()
    }
};

export default fetchAllItems