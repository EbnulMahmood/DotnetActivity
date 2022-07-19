import { Label } from "@mui/icons-material";
import { Field, useField } from "formik";
import { TextField } from "formik-mui";
import React from "react";

interface Props {
    placeholder: string;
    name: string;
    label?: string;
}

export default function MyTextInput(props: Props) {
    
    const [field, meta] = useField(props.name);

    return (
        <Field
            error={meta.touched && !!meta.error}
            component={TextField}
            id="outlined-basic"
            variant="outlined"
            label={props.label}
            {...field} {...props}
        >
            {meta.touched && meta.error ? (
                <Label color="warning">{meta.error}</Label>
            ) : null}
        </Field>
    )
}