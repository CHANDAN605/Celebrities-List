import * as React from 'react';
import { FormControl, Accordion, MenuItem, AccordionDetails, AccordionSummary, Select, TextField } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckIcon from '@mui/icons-material/Check';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Box, styled, Typography } from '@mui/material';
import { useParams, useNavigate } from "react-router-dom";
import Textarea from '@mui/joy/Textarea';
import Swal from 'sweetalert2';
import Button from '@mui/material/Button';
import { useForm } from 'react-hook-form';





const AccordionCard = styled(Accordion)`
margin-bottom:20px !important;
border-radius:10px !important;
`
const Image = styled('img')({
    borderRadius: '50%',
    objectFit: 'cover',
    width: 'auto'
});

const NameTitle = styled(TextField)`
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
margin-left: 0px;
`
const Title = styled(Typography)`
color:#666666;
font-size:20px;
padding:10px;
`
const TitleValue = styled(Typography)`
font-weight:600;
`
const ButtonAction = styled(Box)`
display:flex;
justify-content: end;
`

const SubmitConfirm = styled(Button)`
margin:10px 15px 0px 15px;
cursor:pointer;
`
const CancelButton = styled(Button)`
cursor:pointer;
`

const ArrowBack = styled(ArrowBackIcon)`
cursor:pointer;
`
const EditCelebrities = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [Id, setId] = React.useState('');
    const [fname, setFName] = React.useState('');
    const [lname, setLName] = React.useState('');
    const [age, setAge] = React.useState('');
    const [gender, setGender] = React.useState('');
    const [picture, setPicture] = React.useState('');
    const [country, setCountry] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [isBool, setIsBool] = React.useState(false);
    const [error, setError] = React.useState("");


    React.useEffect(() => {
        getEditUser();
    }, []);


    const genderList = [{
        gender: "male"
    },
    {
        gender: "female"
    },
    {
        gender: "transgender"
    },
    {
        gender: "rather not say"
    },
    {
        gender: "other"
    }];


    const getEditUser = async () => {
        const result = await fetch(`http://localhost:8000/celebritie/${id}`);
        const res = await result.json();
        setId(res.id);
        setFName(res.first);
        setLName(res.last);
        setAge(res.dob);
        setGender(res.gender);
        setCountry(res.country);
        setPicture(res.picture);
        setDescription(res.description);

    }

    // if (fname | lname | description == '') {

    // }
    const Save = () => {
        Swal.fire({
            title: 'Do you want to save the changes?',
            showCancelButton: true,
            confirmButtonText: 'Save',
        }).then((result) => {
            if (result.isConfirmed) {

                EditUser();
            } else if (result.isDenied) {
                Swal.fire('Changes are not saved', '', 'info')
            }
        })
    }

    const EditUser = async () => {
        // debugger;

        const item = {
            "first": fname,
            "last": lname,
            "dob": age,
            "gender": gender,
            "country": country,
            "description": description
        }
        const result = await fetch(`http://localhost:8000/editcelebritie/${Id}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(item),
        });
        const List = await result.json();
        Swal.fire('Information updated successfully!', '', 'success')
        // console.log(List);
    }

    const onChangeHandler = (e) => {

        if (!name.match(/^[A-Za-z\s]*$/)) {
            setIsBool(true);
            alert('error: allows letters only')
        } else {
            setIsBool(false);
        }
    }

    const Cancel = () => {
        getEditUser();
    }

    const Back = () => {
        navigate("/");
    }

    const onFNameChange = (e) => {
        const newValue = e.target.value;

        if (!newValue.match(/^[a-zA-Z][a-zA-Z\\s]+$/)) {
            setError("");
            setFName(newValue); // only set when successful
        } else {
            setError("Forbidden character: %<>$'\"");
        }
    }
    return (
        // <FormControl onSubmit={Save}>
        <AccordionCard expanded={true} style={{ padding: "10px" }} >
            <ArrowBack onClick={Back} />
            <AccordionSummary
                aria-controls="panel1bh-content"
                id="panel1bh-header"
            >
                <Box sx={{ width: '23%', flexShrink: 0 }}>
                    <Image type="file" src={picture} alt="img" />
                </Box>
                < NameTitle
                    onChange={(e) => setFName(e.target.value)}
                    value={fname}
                    name="first"
                    required
                    isRequired="true"
                    // inputProps={{ pattern: "/^[a-zA-Z][a-zA-Z\\s]+$/" }}
                    placeholder='first name'
                />
                < NameTitle
                    onChange={(e) => setLName(e.target.value)}
                    value={lname}
                    name="last"
                    required
                    placeholder='last name'
                // inputProps={{ pattern: "/^[a-zA-Z][a-zA-Z\\s]+$/" }}
                />

            </AccordionSummary>
            <ProfileDetails>
                <AgeContainer>
                    <Title>Age</Title>
                    <TextField
                        id="date"
                        type="date"
                        onChange={(e) => setAge(e.target.value)}
                        value={age}
                        required
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </AgeContainer>
                <Box>
                    <Title>Gender</Title>
                    <TitleValue>
                        <Select
                            value={gender}
                            required
                            onChange={(e) => setGender(e.target.value)}
                            inputProps={{ 'aria-label': 'Without label' }}
                        >
                            {
                                genderList?.map((genderlist, index) => (
                                    <MenuItem key={index} value={genderlist.gender}>{genderlist.gender}</MenuItem>
                                ))
                            }
                        </Select>
                    </TitleValue>
                </Box>
                <Box>
                    <Title>Country</Title>
                    <TitleValue>
                        <TextField
                            required
                            onChange={(e) => setCountry(e.target.value)}
                            value={country}
                            name="firstName"
                        />
                    </TitleValue>
                </Box>
            </ProfileDetails>
            <AccordionDetails>
                <Title>Details</Title>
                <Textarea
                    value={description}
                    required
                    style={{ width: '100%', padding: " 5px 6px 0px" }}
                    onChange={(e) => setDescription(e.target.value)}
                    maxRows={Infinity}
                >
                </Textarea>
            </AccordionDetails>
            <ButtonAction>
                <CancelButton onClick={Cancel} ><CancelIcon style={{ color: 'red', fontSize: '35px' }} /></CancelButton>
                <SubmitConfirm onClick={Save} type="submit"  ><CheckIcon style={{ color: '#0089ff', fontSize: '35px' }} /></SubmitConfirm>
            </ButtonAction>
        </AccordionCard>
        // </FormControl>
    )
}

export default EditCelebrities;