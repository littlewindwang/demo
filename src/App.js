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

    const handleSearchButton = () => {
        axios.get(`https://collectionapi.metmuseum.org/public/collection/v1/objects?metadataDate=${startDate.toISOString().split('T')[0]}`)
            .then(response => {
                setSearchTerms(response?.data?.objectIDs)
            })
            .catch(error => {
                // TODO Network error. display error on page
                console.error('There was an error!', error);
            });
    }
    const handleDatePickerChange = (date) => {
        if (date <= new Date()) {
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
            <Box sx={{padding: '50px'}}>
                有时候真的很无奈,明明能够通过HR对我Email回复的态度中,了解到,我已经和walgreens的这个职位无缘,却依然需要参加第三轮面试.这种给人一点希望然后发拒信的感觉并不好.我不知道为什么walgreens这么大一个公司,为什么不直接把我觉拒绝,而是非要走完面试流程? <br/>
                第一轮coding面试,面完立刻来结果:通过. <br/>
                第二轮系统设计,面完也是立刻来结果:通过. <br/>
                然后HR就开始爱答不理的态度了.我就知道我已经和职位无缘了. <br/>
                不理解为什么还要把面试流程走完. <br/>
                就这样吧 <br/>
                丹尼尔王 (本业已经禁止爬虫爬)
                <Box>
                    <DatePicker selected={startDate} onChange={handleDatePickerChange}></DatePicker>
                </Box>
                <Button variant="contained" onClick={handleSearchButton} disabled={showError}>Get Result</Button>
                <Box>{showError &&
                    <Typography sx={{color: 'red'}}>Error input date, date cannot later than today</Typography>}</Box>
                {searchTerms.length > 1 && <SearchResult searchTerms={searchTerms}/>}
            </Box>
        </div>
    );
}

export default App;
