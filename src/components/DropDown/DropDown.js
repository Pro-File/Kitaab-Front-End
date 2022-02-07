import React, { useState } from "react";
import {
  FormControl,
  InputLabel,
  Select,
  OutlinedInput,
  MenuItem,
  makeStyles,
  Chip,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
  formControl: {
    margin: theme.spacing(2, 0, 2, 0),
    minWidth: "100%",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const Dropdown = ({
  id,
  name,
  label,
  fullWidth,
  selectedOption,
  dense,
  style,
  selected,
  options,
  placeholder,
  onChange,
  disable,
  size,
  mainDivStyle,
}) => {
  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);
  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

  const classes = useStyles();
  return (
    <div style={mainDivStyle || { width: "100%" }}>
      <FormControl
        variant="outlined"
        margin="dense"
        className={classes.formControl}
      >
        <InputLabel margin={dense || "dense"} style={style} ref={inputLabel}>
          {label}
        </InputLabel>
        <Select
          margin="dense"
          name={name}
          multiple
          fullWidth={fullWidth}
          disabled={disable || false}
          style={style || { textTransform: "capitalize" }}
          // value={value || selected}
          value={selected ? selected : null}
          onChange={onChange}
          input={<OutlinedInput input labelWidth={labelWidth} />}
          renderValue={(selected) => (
            <div className={classes.chips}>
              {selected.map((value) => (
                <Chip key={value} label={value} className={classes.chip} />
              ))}
            </div>
          )}
        >
          {options?.map((option, index) => {
            return (
              <MenuItem
                key={index}
                style={style || { textTransform: "capitalize" }}
                value={option.id}
              >
                {option.value}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </div>
  );
};

export default Dropdown;