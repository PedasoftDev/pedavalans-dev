import styled from 'styled-components'
import React, { Fragment } from 'react'
import { Text, VStack } from '@tuval/forms'
import { Button } from '@mui/material'
export const GridContainer = styled.div`
  width: calc(-330px + 100vw);
  height: calc(-220px + 100vh);
  @media (max-width: 1200px) {
    width: 100%;
  }
`

export const Form = (params: {
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
        <div style={{ display: "flex", flexDirection: "column", padding: "10px 0", gap: "10px", height: "calc(100vh - 80px)", overflowY: "auto" }}>
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

