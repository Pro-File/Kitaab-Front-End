import { deepPurple } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
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
  marginal: {
    margin: '10px 5px',
  },
  purple: {
    color: 'white',
    backgroundColor: '#2196f3',
  },
  iconButton: {
    margin: '0px 10px'
  },
  modal:{
    width: '100%',
    height: '100%',
  },
  modalPaper: {
    minWidth: '50vw',
    maxWidth: '50vw',
  },
  commentsBox: {
    width: '100%',
    marginBottom: '0px',
  },
  commentInnerContainer: {
    height: '200px',
    overflowY: 'auto',
    marginRight: '20px'
  },
  buttonContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-end'
  }
  
}));