import {Box, Modal, Typography} from "@mui/material";
import React from "react";

const TagComponent = ({tag}) => {

    return (<Box>{tag.term}: {tag.AAT_URL && <a target="_blank" href={tag.AAT_URL}>AAT</a>} {" "}
        {tag.Wikidata_URL && <a target="_blank" href={tag.Wikidata_URL}>Wikidata</a>}
    </Box>)

}

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '1px solid gray',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
};

// TODO when image load error
function SearchResultItem({item}) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleImageClick = () => {
        handleOpen();
    }
    const handleItemClick =()=>{
        item.objectURL && window.open(item.objectURL,'_blank')
    }

    return (
        <Box data-test-id='search-result-item' spacing={2} sx={{
            borderRadius: '5px',
            border: '1px solid gray',
            minHeight: '85px',
            padding: '5px',
            margin: '3px',
            display: 'flex',
            alignItems: 'center'
        }}>
            <Box onClick={handleImageClick} sx={{
                width: "80px",
                height: "80px",
                overflow:'hidden',
            }}>
                <img
                    src={`${item.primaryImageSmall}`}
                    alt={item.title}
                    loading="lazy"
                    width="100%"
                    height="100%"
                />
            </Box>

            <Box xs={11} sx={{display: 'flex', padding: '5px', justifyContent: "space-between", width: '70%'}} onClick={handleItemClick}>
                <Box>
                    <Typography variant="h6">{item.title|| 'Title Not Available'}</Typography>

                    <Box>Object Date: <b>{item.objectDate || 'Not Available'}</b></Box>
                    <Box>Department: <b>{item.department || 'Not Available'}</b></Box>
                    <Box>Artist Role: <b>{item.artistRole || 'Not Available'}</b></Box>
                    <Box>Artist Display Name: <b>{item.artistDisplayName || 'Not Available'}</b></Box>
                    <Box>Artist Nationality: <b>{item.artistNationality || 'Not Available'}</b></Box>
                </Box>
                <Box>{item.tags && item.tags.length > 0 &&
                    item.tags.slice(0, 3).map(tag => {
                        return <TagComponent key={tag.term} tag={tag}/>
                    })
                }</Box>
            </Box>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby={`child-modal-${item.title}`}
                aria-describedby={`child-modal-${item.title}-large-image`}
            >
                <Box sx={{...style, width: 200}}>
                    <img
                        src={`${item.primaryImage}`}
                        alt={item.title}
                        loading="lazy"
                        width="100%"
                        height="100%"
                    />
                </Box>
            </Modal>
        </Box>
    );
}

export default SearchResultItem;
