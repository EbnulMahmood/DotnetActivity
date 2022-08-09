import React from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Typography from "@mui/material/Typography";
import { ErrorMessage, Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import MyTextInput from "../../app/common/form/MyTextInput";
import { useStore } from "../../app/stores/store";
import * as Yup from 'yup';
import FormValidationErrors from "../errors/FormValidationErrors";

export default observer(function RegisterForm() {
    const {userStore: {register}} = useStore();

    return (
        <Formik
            initialValues={{displayName: '', username: '',
                email: '', password: '', error: null}} 
            onSubmit={(values, {setErrors}) => register(values)
                .catch(err =>
                    setErrors({error: err})
                )
            }
            validationSchema={Yup.object({
                displayName: Yup.string().required(),
                username: Yup.string().required(),
                email: Yup.string().required().email(),
                password: Yup.string().required().matches(
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
                    "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
                ),
            })}
        >
            {({ handleSubmit, isSubmitting, errors, dirty, isValid }) => (
                <Box
                    component={Form}
                    sx={{
                        backgroundColor: 'primary.paper',
                    }}
                    noValidate
                    autoComplete="off"
                    onSubmit={handleSubmit}
                    className='error'
                >
                    <Typography
                        color='white' 
                        id="modal-modal-title" 
                        variant="h6" 
                        component="h2"
                        sx={{paddingBottom: '1em'}}
                    >
                        Register
                    </Typography>
                    <MyTextInput name="displayName" placeholder="Display Name" />
                    <ErrorMessage 
                        component="span"
                        name="displayName"
                        render={() =>
                            <FormValidationErrors errors={errors.error} />
                        }
                    />
                    <MyTextInput name="username" placeholder="Username" />
                    <ErrorMessage 
                        component="span"
                        name="username"
                        render={() =>
                            <FormValidationErrors errors={errors.error} />
                        }
                    />
                    <MyTextInput name="email" placeholder="Email" />
                    <ErrorMessage 
                        component="span"
                        name="email"
                        render={() =>
                            <FormValidationErrors errors={errors.error} />
                        }
                    />
                    <MyTextInput name="password" placeholder="Password" type="password" />
                    <ErrorMessage 
                        component="span"
                        name="password"
                        render={() =>
                            <FormValidationErrors errors={errors.error} />
                        }
                    />
                    <ButtonGroup variant="contained" aria-label="outlined primary button group">
                        <LoadingButton
                            disabled={isSubmitting || !dirty || !isValid}
                            loading={isSubmitting}
                            type="submit" 
                            color="success"
                        >
                            Register
                        </LoadingButton>
                        <Link to='/'>
                            <Button color="warning" >Cancel</Button>
                        </Link>
                    </ButtonGroup>
                </Box>
            )}
        </Formik>
    )
})