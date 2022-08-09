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
import FormValidationErrors from "../errors/FormValidationErrors";

export default observer(function LoginForm() {
    const {userStore: {login}} = useStore();

    return (
        <Formik
            initialValues={{email: '', password: '', error: null}} 
            onSubmit={(values, {setErrors}) => login(values)
                .catch(err =>
                    setErrors({error: err})
                )
            }
        >
            {({ handleSubmit, isSubmitting, errors, dirty }) => (
                <Box
                    component={Form}
                    sx={{
                        backgroundColor: 'primary.paper',
                    }}
                    noValidate
                    autoComplete="off"
                    onSubmit={handleSubmit}
                >
                    <Typography
                        color='white' 
                        id="modal-modal-title" 
                        variant="h6" 
                        component="h2"
                        sx={{paddingBottom: '1em'}}
                    >
                        Login
                    </Typography>
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
                            disabled={isSubmitting || !dirty}
                            loading={isSubmitting}
                            type="submit" 
                            color="success"
                        >
                            Login
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