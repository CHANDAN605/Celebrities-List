import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import { Box, styled, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

import Celebrities from './Celebrities';


const Heading = styled(Typography)`
font-weight:600;
margin-top:20px;
font-size:25px;
margin-bottom:20px;
`
const Container = styled(Box)`
align-item:center;
`

const Search = styled(FormControl)`
margin-top:20px;
margin-bottom:20px;
background:#ffffff;
border-radius:5px;
width:100%;
`



const Home = () => {

    const [celebrities, setCelebrities] = React.useState([]);
    const [keyword, setkeyword] = React.useState("");

    React.useEffect(() => {
        GetCelebrities();
    }, [celebrities])

    const GetCelebrities = async () => {
        const result = await fetch(`http://localhost:8000/celebrities`);
        const Celebrities = await result.json();
        setCelebrities(Celebrities);
    }


    return (
        <Container>
            <Heading>List View</Heading>
            <Box>
                <Search variant="outlined">
                    <OutlinedInput
                        id="outlined-adornment-weight"
                        startAdornment={<InputAdornment position="start"><SearchIcon /></InputAdornment>}
                        aria-describedby="outlined-weight-helper-text"
                        placeholder='Search name'
                        inputProps={{
                            'aria-label': 'weight',
                        }}
                        onChange={(e) => setkeyword(e.target.value)}
                    />
                </Search>
            </Box>
            <Box>
                <Celebrities celebrities={celebrities} keyword={keyword} />
            </Box>

        </Container>
    );
}
export default Home;