import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Grid, CssBaseline,
  Typography, Card,
} from '@material-ui/core/';
import CLogo from '../../../assets/icons/c.svg';
import PythonLogo from '../../../assets/icons/python.svg';
import JavaLogo from '../../../assets/icons/java.svg';
import CPlusLogo from '../../../assets/icons/c++.svg';

const useStyles = makeStyles(() => ({
  root: {
    margin: 0,
  },
  iconRoot: {
    textAlign: "center",
  },
  imageIcon: {
    height: '50%',
    width: '50%'
  },
}));

const LanguagetItem = (props) => {
  const x = props.item;
  const classes = useStyles();
  return (
    <Grid item md={5} xs={10}>
      <Card id={x.id} classes={{ root: classes.iconRoot }}>
        <img className={classes.imageIcon} src={x.icon} alt={x.languageName} />
      </Card>
    </Grid>
  )
}

const SystemInformationPage = () => {
  const classes = useStyles();
  const [allLanguages, setAllLanguages] = useState([])
  useEffect(() => {
    setAllLanguages([
      {
        "id": 0,
        "languageName": "C++",
        "icon": CPlusLogo,
      },
      {
        "id": 1,
        "languageName": "C",
        "icon": CLogo,
      },
      {
        "id": 2,
        "languageName": "Python",
        "icon": PythonLogo,
      },
      {
        "id": 3,
        "languageName": "Java",
        "icon": JavaLogo,
      }
    ]);
  }, []);
  return (
    <>
      <Typography component="h4" variant="h4" align="center">
        支援語言
      </Typography>
      <Grid container md={12} xs={12} justify="center" className={classes.root} spacing={5}>
        <CssBaseline />
        {
          allLanguages.map((x) => (
            <LanguagetItem key={x.id} item={x} />
          ))
        }
      </Grid>
    </>
  )
}
export default SystemInformationPage
