import { makeStyles } from '@material-ui/core/styles';

export default makeStyles({
  media: {
    height: 0,
    paddingTop: '56.25%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    backgroundBlendMode: 'darken',
  },
  border: {
    border: 'solid',
  },
  fullHeightCard: {
    height: '100%',
  },
  rating:{
    cursor: 'pointer',
  },
  ratingSection: {
    marginTop: '45px',
  },
  ratingContainer:{
    width: '100%',
    margin: '5px 0px'
  },
  cutPrice: {
    textDecoration: "line-through",
    position: "relative",
    top: "10px",
    color: "red",
    fontSize: "25px",
  },
  rs: {
    fontWeight: "900",
    zoom: "0.9",
    color: "white",
  },
  overlay2: {
    position: 'absolute',
    top: '85px',
    right: '10px',
    color: 'white',
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    borderRadius: '15px',
    height: '100%',
    position: 'relative',
  },
  content: {
    padding: '0px 20px'
  },
  detailsBtn: {
    marginTop: '20px',
    width: '100%',
  },
  detailsBtnIcon: {
    margin: '0px 8px',
  },
  overlay: {
    position: 'absolute',
    top: '10px',
    left: '10px',
    color: 'white',
  },
  grid: {
    display: 'flex',
  },
  details: {
    margin: '10px 20px',
  },
  title: {
    padding: '0 16px',
  },
  cardActions: {
    padding: '0 16px 8px 16px',
    display: 'flex',
    justifyContent: 'space-between',
  },
});