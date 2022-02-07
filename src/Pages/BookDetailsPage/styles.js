import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  media: {
    borderRadius: '20px',
    objectFit: 'cover',
    width: '100%',
    maxHeight: '600px',
  },
  marginal: {
    margin: '20px 0px'
  },
  cutPrice: {
    textDecoration: "line-through",
    color: "red",
    fontSize: "25px",
  },
  original: {
    fontWeight: "900",
    zoom: "0.9",
    color: "black",
  },
  rating: {
    marginTop: '-20px',
    cursor: 'pointer',
    marginBottom: '20px'
  },
  ratingSection: {
    marginTop: '0px',
  },
  card: {
    display: 'flex',
    width: '100%',
    [theme.breakpoints.down('sm')]: {
      flexWrap: 'wrap',
      flexDirection: 'column',
    },
  },
  section: {
    borderRadius: '20px',
    margin: '10px',
    flex: 1,
  },
  imageSection: {
    marginLeft: '20px',
    [theme.breakpoints.down('sm')]: {
      marginLeft: 0,
    },
  },
  recommendedBooks: {
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  loadingPaper: {
    display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px', borderRadius: '15px', height: '40vh',
  },
}));