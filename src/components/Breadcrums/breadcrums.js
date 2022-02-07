import { Breadcrumbs, Typography } from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";
import { Route  } from "react-router-dom";
import useStyles from './styles';

export default function Breadcums({pathNames}) {
  const classes = useStyles()
  console.log(pathNames);
    return (
      <div className={classes.breadContainer}>
      <Route>
            <Breadcrumbs aria-label="Breadcrumb">
              <RouterLink color="textSecondary" to="/home">
                Home
              </RouterLink>
              {pathNames.map((value, index) => {
  
                return  index === pathNames.length - 1 ? (
                  <Typography color="textSecondary" key={value.to} className={classes.bread}>
                    {value.name}
                  </Typography>
                ) : (
                  <RouterLink color="textSecondary" to={value.to} key={value.to} className={classes.bread}>
                    {value.name}
                  </RouterLink>
                );
              })}
            </Breadcrumbs>
      </Route>
      </div>
    );
}