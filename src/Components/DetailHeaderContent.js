
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React from 'react'

function DetailHeaderContent({name, nickname, imageURL}) {
    const styles = useStyle()
    return (
        <div css = {styles.container}>
            <img css={css({height:200})} alt="Pokemon" src={imageURL} />
            <h2 css={css({marginTop: 0})}>{name}</h2>
            
        </div>
    )
}

export default DetailHeaderContent

const useStyle = () => {
    return{
        container: css({
            background: "rgba(255, 255, 255, 0.3);",
            paddingBottom: 5
        })
    }
}