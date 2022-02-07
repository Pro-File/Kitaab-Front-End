import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
  },
  paper: {
    padding: theme.spacing(4),
  },
  mainHead : {
    textAlign: 'center',
    margin: '40px 0px',
    letterSpacing: '2px',
    wordSpacing: '4px'
  },
  form: {
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  fileInput: {
    width: '100%',
    margin: '10px 0',
  },
  notice:{
    margin: '20px 0px'
  },
  buttonSubmit: {
    margin: '10px 0px'
  },
}));