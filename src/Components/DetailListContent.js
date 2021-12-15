/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React from "react";

function DetailListContent({ title, detailList }) {
    const styles = useStyle()
  return (
    <div css={styles.container}>
        
      <h4>{title}</h4>
      <div css={styles.detailContainer}>
      { detailList?.map((item, index) => <div key={index} css={styles.detailItem}><span>{item}</span></div>)}

      </div>
    </div>
  );
}

export default DetailListContent;

const useStyle = () => {
    return {
        container: css(
            {
                textAlign:"center"
            }
        ),
        detailContainer: css({
            display:"flex",
            flexWrap: "wrap",
            justifyContent: "center"

        })
        ,
        detailItem: css({
            padding: 10,
            margin: 5,
            display: "inline",
            backgroundColor: "yellowgreen",
            borderRadius: 10,
            background: "linear-gradient(to bottom right,#e36c04,#ffdd78);",


        })
        

    }
}
