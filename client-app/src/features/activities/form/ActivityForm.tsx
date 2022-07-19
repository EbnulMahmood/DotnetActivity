import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import LoadingButton from "@mui/lab/LoadingButton";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import { Link, useParams } from "react-router-dom";
import LoadingComponent from "../../../app/layout/loadingComponent";
import Container from "@mui/material/Container";
import { useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import MyTextInput from "../../../app/common/form/MyTextInput";
import MyTextArea from "../../../app/common/form/MyTextArea";
import MySelectInput from "../../../app/common/form/MySelectInput";
import { categoryOptions } from "../../../app/common/options/categoryOptions";
import MyDateInput from "../../../app/common/form/MyDateInput";
import { Activity } from "../../../app/models/activity";
import { v4 as uuid } from 'uuid';

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
        date: null,
        city: '',
        venue: ''
    };
    const [activity, setActivity] = useState<Activity>(emptyActivity);

    const validationSchema = Yup.object({
        title: Yup.string().required('The activity title is required'),
        description: Yup.string().required('The activity description is required'),
        category: Yup.string().required(),
        date: Yup.string().required('Date is required').nullable(),
        venue: Yup.string().required(),
        city: Yup.string().required(),
    })

    useEffect(() => {
        if (id) {
            loadActivity(id).then(activity => setActivity(activity!));
        }
        else {
            setActivity({
                id: '',
                title: '',
                category: '',
                description: '',
                date: null,
                city: '',
                venue: ''
            });
        }
    }, [id, loadActivity, setActivity]);

    function handleFormSubmit(activity: Activity) {
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

    if (loadingInitial) return <LoadingComponent />

    return (
        <Container 
            style={{marginTop: '7em', padding: '2em'}}
            sx={{ width: '50%', bgcolor: 'background.paper' }}
        >
            <Formik
                validationSchema={validationSchema}
                enableReinitialize
                initialValues={activity} 
                onSubmit={values => handleFormSubmit(values)}
            >
                {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                    <Box
                        component={Form}
                        sx={{
                            '& > :not(style)': { m: 1, width: '25ch' },
                            backgroundColor: 'primary.paper',
                        }}
                        noValidate
                        autoComplete="off"
                        onSubmit={handleSubmit}
                    >
                        <MyTextInput name="title" placeholder="Title" />
                        <MySelectInput options={categoryOptions} name="category" placeholder="Category" />
                        <MyDateInput name="date" placeholder="Date" />
                        <MyTextInput name="city" placeholder="City" />
                        <MyTextInput name="venue" placeholder="Venue" />
                        <MyTextArea name="description" placeholder="Description" rows={4} multiline />
                        <ButtonGroup variant="contained" aria-label="outlined primary button group">
                            <LoadingButton
                                disabled={isSubmitting || !dirty || !isValid}
                                loading={loading} 
                                type="submit" 
                                color="success"
                            >
                                Submit
                            </LoadingButton>
                            <Link to='/activities'>
                                <Button color="warning" >Cancel</Button>
                            </Link>
                        </ButtonGroup>
                    </Box>
                )}
            </Formik>
        </Container>
    )
})