import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  mainContainer: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  smMargin: {
    margin: theme.spacing(1),
  },
  container: {
    display: 'flex',
    justifyContent:'center'
  },
  actionDiv: {
    textAlign: 'center',
  },
}));