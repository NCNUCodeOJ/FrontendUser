import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import {
  Grid, Typography, Card, CardActions, CardContent,
  Button,
} from '@material-ui/core/';
import {
  ListItem, ListItemIcon, ListItemText,
} from '@material-ui/core';
import {
  Code, ArrowBack, Keyboard

} from '@material-ui/icons/';
const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    marginTop: '10px',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
}));

const CourseItemLink = (props) => {
  return <Button component="a" {...props} />;
}

const ListItemLink = (props) => {
  return <ListItem button component="a" {...props} />;
}

const Item = (props) => {
  const x = props.item;
  const dispatch = useDispatch();
  const backToCourseList = () => {
    dispatch({ type: 'set', customNavBar: null });
  };
  const goToHomeworkList = () => {
    dispatch({
      type: 'set', customNavBar: () => {
        return (
          <>
            <ListItemLink button onClick={backToCourseList} href="#course">
              <ListItemIcon>
                <ArrowBack />
              </ListItemIcon>
              <ListItemText primary="返回" />
            </ListItemLink>
            <ListItemLink href={`#course/examlist/${x.id}`}>
              <ListItemIcon>
                <Code />
              </ListItemIcon>
              <ListItemText primary="測驗" />
            </ListItemLink>
            <ListItemLink href={`#course/homeworklist/${x.id}`}>
              <ListItemIcon>
                <Keyboard />
              </ListItemIcon>
              <ListItemText primary="作業" />
            </ListItemLink>
          </>
        )
      }
    });

  };

  return (
    <>
      <Grid item md={10} xs={12}>
        <Card id={x.id} className={x.root} >
          <CardContent>
            <Grid item md={8} xs={6}>
              <Typography variant="h5" component="h2">
                {x.courseName}
              </Typography>
            </Grid>
            <CardActions>
              <Grid container justify="flex-end">
                <Grid item md={4} xs={6}>
                  <CourseItemLink fullWidth color="primary" variant="contained"
                    onClick={goToHomeworkList} href={`#course/homeWorklist/${x.id}`}>
                    進入
                  </CourseItemLink>
                </Grid>
              </Grid>
            </CardActions>
          </CardContent>
        </Card>
      </Grid>
    </>
  );
}


const CourseList = () => {
  const classes = useStyles();
  const [allCourse, setAllCourse] = useState([])
  useEffect(() => {
    setAllCourse([
      {
        "id": 0,
        "courseName": "程式設計"
      },
      {
        "id": 1,
        "courseName": "Hello World"
      }
    ]);
  }, []);
  return (
    <>
      <Typography align="center" variant="h4">
        課程清單
      </Typography>
      <Grid container justify="center" spacing={1} className={classes.root}>
        {
          allCourse.map((x) => (
            <Item key={x.id} item={x} className={classes.heading} />
          ))
        }
      </Grid>
    </>
  );
}

export default CourseList
