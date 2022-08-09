import { Label } from "@mui/icons-material";
import MenuItem from "@mui/material/MenuItem";
import { Field, useField } from "formik";
import { Select } from "formik-mui";
import React from "react";

interface Props {
    placeholder: string;
    name: string;
    label?: string;
    type?: string;
    options?: any
}

export default function MySelectInput(props: Props) {
    
    const [field, meta] = useField(props.name);

    return (
        <Field
            component={Select}
            formHelperText={{ children: 'Select category' }}
            labelId="select-simple"
            variant="outlined"
            {...field} {...props}
            validate={meta.touched && meta.error ? (
                <Label color="warning">{meta.error}</Label>
            ) : null}
        >
            {[...props.options].map(({value, text}, index) =>
                {
                    return (
                        <MenuItem key={index} value={value}>
                            {text}
                        </MenuItem>
                    );
                }
            )}
        </Field>
    )
}