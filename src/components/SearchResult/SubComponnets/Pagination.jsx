import {Box, Button} from "@mui/material";

const Pagination = ({ totalItems, dataPerPage, currentPage, setCurrentPage,clearFilter }) => {
    const totalPages = Math.ceil(totalItems / dataPerPage);

    // TODO handle page click
    // const handlePageClick = (page) => {
    //     setCurrentPage(page);
    // };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
        clearFilter()
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
        clearFilter()
    };

    return (
        <Box>
            <Button onClick={handlePrevPage} disabled={currentPage === 1}>
                Prev Page
            </Button>

            {/* Page Button, TODO this later, Have to add ... if there are lots of pages.*/}
            {/*{[...Array(totalPages).keys()].map((page) => (*/}
            {/*    <Button*/}
            {/*        key={page + 1}*/}
            {/*        onClick={() => handlePageClick(page + 1)}*/}
            {/*        disabled={currentPage === page + 1}*/}
            {/*    >*/}
            {/*        {page + 1}*/}
            {/*    </Button>*/}
            {/*))}*/}
            {currentPage}/{totalPages}

            <Button onClick={handleNextPage} disabled={currentPage === totalPages}>
                Next Page
            </Button>
        </Box>
    );
};
export default Pagination