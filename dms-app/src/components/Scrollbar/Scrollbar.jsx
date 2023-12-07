import React from "react"
import PropTypes from "prop-types"
import { ScrollbarWrapper } from "./styles"

export const Scrollbar = ({data}) => {
    return (
        <ScrollbarWrapper>
          {data}
        </ScrollbarWrapper>
    )
}


Scrollbar.propTypes = {
    children: PropTypes.node.isRequired,
}

export default Scrollbar;