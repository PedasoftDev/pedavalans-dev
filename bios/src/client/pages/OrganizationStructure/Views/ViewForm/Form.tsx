import { Button } from '@mui/material'
import { Text, VStack } from '@tuval/forms'
import React, { Fragment } from 'react'

const Form = (params: {
    title: string,
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void,
    formContent: JSX.Element,
    buttons?: {
        text: string,
        type?: "submit" | "reset" | "button" | undefined,
        color?: "primary" | "secondary" | "error" | "info" | "success" | "warning" | undefined,
        onClick?: () => void
    }[]
}) => {
    return (
        <div style={{ display: "flex", flexDirection: "column", padding: "10px 0", gap: "10px" }}>
            <Fragment>{VStack(Text(params.title).fontWeight("500").fontSize("15px").textTransform("capitalize").fontFamily("Poppins")).height().render()}</Fragment>
            <form style={{
                display: "flex",
                flexDirection: "column",
                gap: "20px",
                width: "100%",
                alignItems: "center"
            }} onSubmit={params.onSubmit}>
                {params.formContent}
                <div style={{ display: "flex", flexDirection: "column", gap: "10px", width: "50%" }}>
                    {params.buttons.map((button) =>
                        <Button variant='contained' fullWidth color={button.color} onClick={button.onClick} size='small' type={button.type}>{button.text}</Button>
                    )}
                </div>
            </form>
        </div>
    )
}

export default Form