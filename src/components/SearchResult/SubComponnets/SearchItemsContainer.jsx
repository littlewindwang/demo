import {Box} from "@mui/material";
import SearchResultItem from "./SearchResultItem";

function SearchItemsContainer({currentData}) {
    return (
        <Box data-testid="search-items-container">
            {currentData && currentData.length > 0 && currentData.map(item => {
               return <SearchResultItem key={item.objectID} item={item}/>
            })
            }
        </Box>
    );
}

export default SearchItemsContainer;
