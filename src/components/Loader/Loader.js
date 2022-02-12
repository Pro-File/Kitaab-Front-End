import { Grid } from "@material-ui/core";
import React from "react";
import {ThreeDots} from "react-loader-spinner";
// import theme from "../../theme";

// const style = {
//     position: 'absolute',
//     top: '50%',
//     left: '50%',
//     transform: 'translate(-50%, -50%)'
// }

const Spinner = ({ height, width, color, type }) => {
//   const LoaderColor = theme.palette.primary.main;

  return (
    <Grid container justify="center" alignItems="center">
      <div>
        <ThreeDots
          visible={true}
          // timeout={3000} 
          type={type || "TailSpin"}
        //   color={LoaderColor}
          color={color || '#188882'}
          height={height || 100}
          width={width || 100}
        />
      </div>
    </Grid>
  );
};

export default Spinner;