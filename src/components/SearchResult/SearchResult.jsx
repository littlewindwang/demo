import {Box, Button} from "@mui/material";
import SearchItemsContainer from "./SubComponnets/SearchItemsContainer";

import fetchAllItems from "../../utils/fetchAllItems";
import {useEffect, useState} from "react";
import Pagination from "./SubComponnets/Pagination";

const DATA_PER_PAGE=10
function SearchResult({searchTerms}) {

    const [currentPage, setCurrentPage] = useState(1);
    const [searchTermsData, setSearchTermsData] = useState([]);

    // calcute current data info
    const indexOfLastItem = currentPage * DATA_PER_PAGE;
    const indexOfFirstItem = indexOfLastItem - DATA_PER_PAGE;

    useEffect((

    ) => {
        fetchAllItems(searchTerms.slice(indexOfFirstItem, indexOfLastItem)).then(results => {
            setSearchTermsData(results)
    });},[currentPage])

    return (
        <Box data-testid="search-result" >
            this is reach result
            <Box data-testid="search-header">
                searchTerms search result is {searchTerms.length}
            </Box>

            <SearchItemsContainer currentData={searchTermsData}/>
            <Pagination
                totalItems={searchTerms.length}
                dataPerPage={DATA_PER_PAGE}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
            />
        </Box>
    );
}

export default SearchResult;
