import { Label } from "@mui/icons-material";
import { Field, useField } from "formik";
import { TextField } from "formik-mui";
import React from "react";

interface Props {
    placeholder: string;
    name: string;
    label?: string;
    rows?: number;
    multiline?: boolean;
}

export default function MyTextArea(props: Props) {
    
    const [field, meta] = useField(props.name);

    return (
        <Field
            error={meta.touched && !!meta.error}
            component={TextField}
            variant="outlined"
            {...field} {...props}
        >
            {meta.touched && meta.error ? (
                <Label color="warning">{meta.error}</Label>
            ) : null}
        </Field>
    )
}