import { makeStyles } from "@material-ui/core/styles";
import { deepPurple } from "@material-ui/core/colors";

export default makeStyles((theme) => ({
  container: {
    width: "100%",
    height: "20vh",
    display: "flex",
    justifyContent: "center",
    margin: "40px 0px",
  },
  childContainer: {
    background: "#179992",
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
  heading: {
    margin: "20px 0px",
    textAlign: "center",
    textDecoration: "none",
    textDecorationLine: "none"
  },
  button: {
    margin: "0px 10px",
    textDecoration: "none",
  },
}));
