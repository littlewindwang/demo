import './App.css';
import SearchResult from "./components/SearchResult/SearchResult";
import {Button} from "@mui/material";
import {useState} from "react";
import axios from "axios";

function App() {
    const [searchTerms, setSearchTerms] = useState([]);
    const handleSearchButton=()=>{

        axios.get('https://collectionapi.metmuseum.org/public/collection/v1/objects?metad\n' +
            'ataDate=2024-09-01')
            .then(response => {
                // console.log(response?.data?.objectIDs); // Handle the response data here

                setSearchTerms(response?.data?.objectIDs)
            })
            .catch(error => {
                // Console.log it or send it to datadog.
                // TODO Network error. display on page
                console.error('There was an error!', error);
            });
    }


  return (
    <div className="App">
        <Button variant="contained" onClick={handleSearchButton}>Get Result</Button>
        {searchTerms.length>1 && <SearchResult searchTerms={searchTerms}/>}

    </div>
  );
}

export default App;
