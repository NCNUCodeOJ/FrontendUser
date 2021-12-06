import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import JSONbig from 'json-bigint';
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
import { getCourseList, getCourseInfo } from 'src/api/user/course/api';

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
  const history = useHistory()
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
                {x.class_name}
              </Typography>
            </Grid>
            <CardActions>
              <Grid container justify="flex-end">
                <Grid item md={4} xs={6}>
                  <CourseItemLink fullWidth color="primary" variant="contained"
                    onClick={() => { goToHomeworkList(); history.push(`/course/homeWorklist/${x.class_id}`); }}>
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
  const [allCourse, setAllCourse] = useState([]);

  const showCourseList = () => {
    const token = localStorage.getItem('token');
    getCourseList(token)
      .then((rs) => {
        var data = JSONbig.parse(rs.data);
        // console.log(data.classes[0].toString())
        const tempClassID = data.classes;
        const classData = [];
        getClassIndiData(token, tempClassID, classData);
      })
      .catch((error) => {
        console.log(error);
      })
  }
  useEffect(() => {
    showCourseList();
  }, []);

  function getClassIndiData(token, tempClassID, classData) {
    let temp = null;
    temp = tempClassID.pop();
    getCourseInfo(token, temp.toString())
      .then((rs) => {
        rs.data.class_id = temp.toString();
        classData.push(rs.data);
        if (tempClassID.length > 0) {
          getClassIndiData(token, tempClassID, classData);
        } else {
          setAllCourse(classData);
        }
      })
  }

  return (
    <>
      <Typography align="center" variant="h4">
        課程清單
      </Typography>
      <Grid container justify="center" spacing={1} className={classes.root}>
        {
          allCourse.map((x) => (
            <Item key={x.class_id} item={x} className={classes.heading} />
          ))
        }
      </Grid>
    </>
  );
}

export default CourseList
