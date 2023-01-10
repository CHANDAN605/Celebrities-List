import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Edit from '@mui/icons-material/ModeEditOutlineOutlined';
import { Box, styled, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';


const AccordionCard = styled(Accordion)`
margin-bottom:20px !important;
border-radius:10px !important;
`
const Image = styled('img')({
    borderRadius: '50%',
    objectFit: 'cover',
    width: 'auto'
});

const NameTitle = styled(Typography)`
font-size:20px;
font-weight:600;
margin-top:20px;
align-items:center;
`
const ProfileDetails = styled(Box)`
display:flex;
justify-content: space-around;
`
const AgeContainer = styled(Box)`
margin-left: -70px;
`
const Title = styled(Typography)`
color:#666666;
font-size:20px;
`
const TitleValue = styled(Typography)`
font-weight:600;
`
const ButtonAction = styled(Box)`
display:flex;
justify-content: end;
`
const Button = styled(Box)`
margin:17px;
`

const DeleteButton = styled(Button)`
cursor:pointer;
`

const RecordNotFound = styled(AccordionCard)`
text-align:center;
`
const Record = styled(Typography)`
font-weight:600;
margin:30px;
`
const Celebrities = ({ celebrities, keyword }) => {
    const [expanded, setExpanded] = React.useState(false);
    // const [loading, setLoading] = React.useState(true);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    if (keyword) {
        celebrities = celebrities?.filter((data) => {
            const name = data.first + data.last;
            return name.toLowerCase().includes(keyword.toLowerCase());
        });
    }

    function getAge(dateString) {
        var today = new Date();
        var birthDate = new Date(dateString);
        var age = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    }


    const ButtonDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                Delete(id);

            }
        })
    }

    const Delete = async (id) => {

        const item = {
            "id": id,
        }
        const result = await fetch(`http://localhost:8000/deletecelebritie/${id}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(item),
        });
        const List = await result.json();
        if (List.deletedCount == 1) {
            Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
            )
        } else {
            Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'fail'
            )
        }
        console.log(List);

    }


    return (
        <>
            {
                celebrities?.length == 0 ? (
                    <RecordNotFound expanded={true} style={{ width: '100%', height: "30px" }}>
                        <Record >No Record Found!</Record>
                    </RecordNotFound>
                )
                    :
                    <>
                        {
                            celebrities &&
                            celebrities?.map((List, index) =>
                            (

                                <AccordionCard key={index} expanded={expanded === List._id} onChange={handleChange(List._id)}>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel1bh-content"
                                        id="panel1bh-header"
                                    >
                                        <Box sx={{ width: '17%', flexShrink: 0 }}>
                                            <Image src={List.picture} alt="img" />
                                        </Box>
                                        <NameTitle sx={{ color: 'text.secondary' }}>{List.first}&nbsp;{List.last}</NameTitle>
                                    </AccordionSummary>
                                    <ProfileDetails>
                                        <AgeContainer>
                                            <Title>Age</Title>
                                            <TitleValue>{getAge(List.dob)} Years</TitleValue>
                                        </AgeContainer>
                                        <Box>
                                            <Title>Gender</Title>
                                            <TitleValue>{List.gender}</TitleValue>
                                        </Box>
                                        <Box>
                                            <Title>Country</Title>
                                            <TitleValue>{List.country}</TitleValue>
                                        </Box>
                                    </ProfileDetails>
                                    <AccordionDetails>
                                        <Title>Details</Title>
                                        <Typography>
                                            {List.description}
                                        </Typography>
                                    </AccordionDetails>
                                    <ButtonAction>
                                        <DeleteButton onClick={(e) => ButtonDelete(List.id)} ><DeleteForeverIcon style={{ color: 'red', fontSize: '35px' }} /></DeleteButton>
                                        <Link to={`edit/${List._id}`}>
                                            <Button><Edit style={{ color: '#0089ff', fontSize: '35px' }} /></Button>
                                        </Link>
                                    </ButtonAction>
                                </AccordionCard>
                            )
                            )
                        }
                    </>

            }
        </>

    )
}
export default Celebrities;