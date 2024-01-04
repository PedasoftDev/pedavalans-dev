import React from 'react'

const Form = (
    props: {
        title: string,
        form: React.ReactNode
    }
) => {
    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            gap: "30px",
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
        }}>
            <div style={{
                fontFamily: "Poppins",
                fontStyle: "normal",
                fontWeight: "400",
                fontSize: "18px",
                lineHeight: "24px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
            }}>
                <span>{props.title}</span>
            </div>
            {props.form}
        </div>
    )
}

export default Form