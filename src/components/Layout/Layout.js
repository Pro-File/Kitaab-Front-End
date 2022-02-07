import * as React from "react"
import PropTypes from "prop-types"
import { createTheme, ThemeProvider } from "@material-ui/core/styles"
import "./layout.css"
const theme = createTheme({
  palette: {
    primary: {
      main: "#106B66",
    },
    secondary: {
      main: "#179992",
    },
  },
})

const Layout = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
        <main>{children}</main>
    </ThemeProvider>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout;