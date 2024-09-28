import './App.css';
import SearchResult from "./components/SearchResult/SearchResult";
import {Box, Button, Typography} from "@mui/material";
import {useState} from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


function App() {
    const [searchTerms, setSearchTerms] = useState([]);
    const [startDate, setStartDate] = useState(new Date());
    const [showError, setShowError] = useState(false);


    const handleSearchButton=()=>{

        axios.get(`https://collectionapi.metmuseum.org/public/collection/v1/objects?metadataDate=${startDate.toISOString().split('T')[0]}`)
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
    const handleDatePickerChange=(date)=>{
        if(date<=new Date()){
            // correct input
            // before today or today
            setShowError(false);
        } else {
            // invalid input
            // after today
            setShowError(true);
        }
        setStartDate(date);

    }


  return (
    <div className="App">
        <Box sx={{padding:'0 50px'}}>
            <Box>
            <DatePicker selected={startDate} onChange={handleDatePickerChange}></DatePicker>
            </Box>
            <Button variant="contained" onClick={handleSearchButton} disabled={showError}>Get Result</Button>
            <Box>{showError&&<Typography sx={{color:'red'}}>Error input date, date cannot later than today</Typography>}</Box>
            {searchTerms.length>1 && <SearchResult searchTerms={searchTerms}/>}
        </Box>


    </div>
  );
}

export default App;
