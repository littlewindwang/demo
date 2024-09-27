import {Box, Button, Typography} from "@mui/material";

const Pagination = ({ totalItems, dataPerPage, currentPage, setCurrentPage }) => {
    const totalPages = Math.ceil(totalItems / dataPerPage);

    const handlePageClick = (page) => {
        setCurrentPage(page);
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    return (
        <Box>
            <Button onClick={handlePrevPage} disabled={currentPage === 1}>
                Prev Page
            </Button>

            {/* Page Button */}
            {/*{[...Array(totalPages).keys()].map((page) => (*/}
            {/*    <Button*/}
            {/*        key={page + 1}*/}
            {/*        onClick={() => handlePageClick(page + 1)}*/}
            {/*        disabled={currentPage === page + 1}*/}
            {/*    >*/}
            {/*        {page + 1}*/}
            {/*    </Button>*/}
            {/*))}*/}
            {currentPage}

            <Button onClick={handleNextPage} disabled={currentPage === totalPages}>
                Next Page
            </Button>
        </Box>
    );
};
export default Pagination