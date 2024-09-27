import {Box, Button, Grid, Link, Typography} from "@mui/material";

const TagComponent = ({tag}) => {

    return (<Box>{tag.term} {tag.AAT_URL && <Link href={tag.AAT_URL}>AAT</Link>} {" "}
        {tag.Wikidata_URL && <Link href={tag.Wikidata_URL}>Wikidata</Link>}
    </Box>)

}


function SearchResultItem({item}) {
    console.log(item)

    // if (item.tags && item.tags.length > 0) {
    //     console.log(item.tags)
    // }


    return (

        <Box container spacing={2} sx={{
            borderRadius:'5px',
            border:'gray solid 1px',
            minHeight:'85px',
            padding:'5px',
            margin:'3px',
            display:'flex',
            // justifyContent:'flex-start',
            alignItems:'center'
        }}>
                    <img
                        srcSet={`${item.primaryImageSmall}`}
                        src={`${item.primaryImageSmall}`}
                        alt={item.title}
                        loading="lazy"
                        width="40px"
                        height="40px"
                    />
            <Box item xs={11} sx={{display:'flex',padding:'5px', justifyContent:"space-between",width:'70%'}}>
                <Box>
                    <Typography variant="subtitle1" >Title:{item.title}</Typography>

                <Box>{item.objectDate}</Box>
                <Box>{item.department}</Box>
                <Box>{item.artistRole}</Box>
                <Box>{item.artistDisplayName}</Box>
                <Box>{item.artistNationality}</Box>
                </Box>
                <Box>{item.tags&&item.tags.length>0&&
                    item.tags.slice(0,3).map(tag =>{ return <TagComponent key={tag.term} tag={tag}/>})
                }</Box>
            </Box>
        </Box>
    );
}

export default SearchResultItem;
