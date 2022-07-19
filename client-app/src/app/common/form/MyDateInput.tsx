import { Label } from "@mui/icons-material";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { Field, useField } from "formik";
import React from "react";

interface Props {
    placeholder: string;
    name: string;
    label?: string;
}

export default function MyDateInput(props: Props) {
    
    const [field, meta, helpers] = useField(props.name!);

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Field
                error={meta.touched && !!meta.error}
                component={DateTimePicker}
                id="outlined-basic"
                variant="outlined"
                name={props.name}
                label={props.label}
                placeholder={props.label}
                value={(field.value && new Date(field.value)) || null}
                onChange={(value: any) => helpers.setValue(value)}
                renderInput={(params: JSX.IntrinsicAttributes & TextFieldProps) =>
                    <TextField {...params} />
                }
            >
                {meta.touched && meta.error ? (
                    <Label color="warning">{meta.error}</Label>
                ) : null}
            </Field>
        </LocalizationProvider>
    )
}