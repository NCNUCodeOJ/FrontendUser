import { Alert, AlertTitle } from '@material-ui/lab';

const ErrorMsg = (props) => {
  if (props.msg === "")
    return null;
  return (
    <Alert severity='error'>
      <AlertTitle>請注意</AlertTitle>
      {props.msg}
    </Alert>
  );
}

export default ErrorMsg;
