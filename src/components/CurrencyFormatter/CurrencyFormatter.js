import React from "react";
import CurrencyFormat from "react-currency-format";
import { Typography } from "@material-ui/core";

const CurrencyFormatter = ({ total, variant, bold }) => {
  return (
    <CurrencyFormat
      value={total}
      displayType={"text"}
      thousandSeparator={true}
      renderText={(value) => (
        <Typography
          style={bold ? { fontWeight: "bold" } : {}}
          component="span"
          variant={variant}
        >
          <Typography variant="caption">{total !== "" ? "Rs." : ""}</Typography>
          {value}
        </Typography>
      )}
    />
  );
};

export default CurrencyFormatter;