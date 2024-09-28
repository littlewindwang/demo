import {Box, Button} from "@mui/material";
import SearchItemsContainer from "./SubComponnets/SearchItemsContainer";

import fetchAllItems from "../../utils/fetchAllItems";
import {useEffect, useState} from "react";
import Pagination from "./SubComponnets/Pagination";

const DATA_PER_PAGE = 10

// get first top 3 depmartments
function getTopDepartments(data) {
    const departmentCount = {};
    data.forEach(item => {
        const department = item.department;
        if (department) {
            departmentCount[department] = (departmentCount[department] || 0) + 1;
        }
    });
    const sortedDepartments = Object.entries(departmentCount)
        .sort((a, b) => b[1] - a[1]);
    const topDepartments = sortedDepartments.slice(0, 3).map(item => item[0]);

    return topDepartments;
}

function SearchResult({searchTerms}) {

    const [currentPage, setCurrentPage] = useState(1);
    const [searchTermsData, setSearchTermsData] = useState([]);
    const [topThreeDepartments, setTopThreeDepartments] = useState([]);
    const [departFilter, setDepartFilter] = useState('');

    // generate current data info
    const indexOfLastItem = currentPage * DATA_PER_PAGE;
    const indexOfFirstItem = indexOfLastItem - DATA_PER_PAGE;

    // const displayList=
    const handleDepmartmentFilter = (depmartment) => {
        setDepartFilter(depmartment)
    }
    const handleClearFilter=()=>{
        setDepartFilter('');
    }

    useEffect(() => {
        fetchAllItems(searchTerms.slice(indexOfFirstItem, indexOfLastItem)).then(results => {
            setSearchTermsData(results)
            setTopThreeDepartments(getTopDepartments(results));
        });
    }, [currentPage])


    console.log(searchTermsData.filter((item)=>{
        console.log(item.department)
        return item.department===departFilter
    }))
    return (
        <Box data-testid="search-result">
            <Box data-testid="search-header">
                Total search result is {searchTerms.length}
                <Box>
                    <b>Department Filter(for current page):</b>
                    {topThreeDepartments && topThreeDepartments.length > 0 && topThreeDepartments.map((d) => {

                        return <Button key={d}
                                       variant={departFilter === d ? 'contained' : 'outlined'}
                                       color={departFilter === d ? 'primary' : 'default'}
                                       sx={{margin:"5px"}}
                                       onClick={() => {
                                           handleDepmartmentFilter(d)
                                       }}>{d}</Button>

                    })}
                    <Button variant="contained" onClick={handleClearFilter}>Clear filter</Button>

                </Box>


            </Box>

            <SearchItemsContainer currentData={departFilter===''?searchTermsData:searchTermsData.filter((item)=>{
               return item.department===departFilter
            })}/>


            <Pagination
                totalItems={searchTerms.length}
                dataPerPage={DATA_PER_PAGE}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                clearFilter={handleClearFilter}
            />
        </Box>
    );
}

export default SearchResult;
