import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import LoadingButton from "@mui/lab/LoadingButton";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import { Link, useParams } from "react-router-dom";
import LoadingComponent from "../../../app/layout/loadingComponent";
import Container from "@mui/material/Container";
import { v4 as uuid } from 'uuid';
import { useNavigate } from "react-router-dom";

export default observer(function ActivityForm() {
    const navigate = useNavigate();
    const {activityStore} = useStore();
    const {createActivity, updateActivity, loadActivity, loading, loadingInitial} = activityStore;
    const {id} = useParams<{id: string}>();
    const emptyActivity = {
        id: '',
        title: '',
        category: '',
        description: '',
        date: '',
        city: '',
        venue: ''
    };
    const [activity, setActivity] = useState(emptyActivity);

    useEffect(() => {
        if (id) {
            loadActivity(id).then(activity => setActivity(activity!));
        }
        else {
            setActivity(emptyActivity);
        }
    }, [id, loadActivity]);

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (activity.id.length === 0) {
            let newActivity = {
                ...activity,
                id: uuid()
            }
            createActivity(newActivity).then(() => navigate(`/activities/${newActivity.id}`));
        } else {
            updateActivity(activity).then(() => navigate(`/activities/${activity.id}`));
        }
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
        const {name, value} = event.target;
        setActivity({...activity, [name]: value});
    }

    if (loadingInitial) return <LoadingComponent />

    return (
        <Container 
            style={{marginTop: '7em', padding: '2em'}}
            sx={{ width: '50%', bgcolor: 'background.paper' }}
        >
            <Box
                component="form"
                sx={{
                    '& > :not(style)': { m: 1, width: '25ch' },
                    backgroundColor: 'primary.paper',
                }}
                noValidate
                autoComplete="off"
                onSubmit={handleSubmit}
            >
                <TextField value={activity.title} name="title" onChange={handleInputChange} id="outlined-basic" size="small" label="Title" variant="outlined" />
                <TextField value={activity.category} name="category" onChange={handleInputChange} id="outlined-basic" size="small" label="Category" variant="outlined" />
                <TextField value={activity.date} name="date" onChange={handleInputChange} type="date" id="outlined-basic" size="small" label="Date" variant="outlined" />
                <TextField value={activity.city} name="city" onChange={handleInputChange} id="outlined-basic" size="small" label="City" variant="outlined" />
                <TextField value={activity.venue} name="venue" onChange={handleInputChange} id="outlined-basic" size="small" label="Venue" variant="outlined" />
                <TextField value={activity.description} name="description" onChange={handleInputChange}
                    id="outlined-textarea"
                    size="small" label="Description"
                    rows={4}
                    multiline
                />
                <ButtonGroup variant="contained" aria-label="outlined primary button group">
                    <LoadingButton loading={loading} type="submit" color="success">Submit</LoadingButton>
                    <Link to='/activities'>
                        <Button color="warning" >Cancel</Button>
                    </Link>
                </ButtonGroup>
            </Box>
        </Container>
    )
})