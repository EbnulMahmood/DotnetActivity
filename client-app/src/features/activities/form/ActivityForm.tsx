import React, { ChangeEvent, useState } from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { Activity } from "../../../app/models/activity";
import LoadingButton from "@mui/lab/LoadingButton";

interface Props {
    activity: Activity | undefined;
    closeForm: () => void;
    createOrEdit: (activity: Activity) => void;
    submitting: boolean;
}

export default function ActivityForm({activity: selectedActivity,
    closeForm, createOrEdit, submitting}: Props) {
    
    const initialState = selectedActivity ?? {
        id: '',
        title: '',
        category: '',
        description: '',
        date: '',
        city: '',
        venue: ''
    }

    const [activity, setActivity] = useState(initialState);

    function handleSubmit() {
        createOrEdit(activity);
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
        const {name, value} = event.target;
        setActivity({...activity, [name]: value});
    }

    return (
        <Box
            component="form"
            sx={{
                '& > :not(style)': { m: 1, width: '25ch' },
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
                <LoadingButton loading={submitting} type="submit" color="success">Submit</LoadingButton>
                <Button onClick={closeForm} color="warning" >Cancel</Button>
            </ButtonGroup>
        </Box>
    )
}