import React, { useState, useEffect, useLayoutEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Typography, Accordion, AccordionSummary,
  AccordionDetails, Fab,
} from '@material-ui/core/';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { HelpOutline, MessageOutlined, Add, } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    marginTop: '10px'
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  qatitle: {
    wordWrap: "break-word",
    [theme.breakpoints.only('xs')]: {
      maxWidth: "200px",
    },
    [theme.breakpoints.only('sm')]: {
      maxWidth: "400px",
    },

    [theme.breakpoints.up('md')]: {
      maxWidth: "800px",
    }
  },
  fab: {
    margin: 0,
    top: 'auto',
    right: 20,
    bottom: 20,
    left: 'auto',
    position: 'fixed',
  }
}));

function useWindowSize() {
  const [size, setSize] = useState([0, 0]);
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);
  return size;
}

const ShowWindowDimensions = (props) => {
  const [width, height] = useWindowSize();
  return <span>Window size: {width} x {height}</span>;
}

const Item = (props) => {
  const classes = useStyles();
  const x = props.item
  return (
    <>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          id={x.id}
        >
          <Typography className={classes.qatitle} component="p" align="left">
            <HelpOutline />
            {" " + x.question}
          </Typography>

        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <MessageOutlined />
            {"        Ans : " + x.answer}
          </Typography>
        </AccordionDetails>
      </Accordion>
    </>
  );
}


const QAList = () => {
  const classes = useStyles();
  const [allClass, setAllClass] = useState([])
  useEffect(() => {
    setAllClass([
      {
        "id": 15,
        "question": "請問比賽時可以上網查用法嗎？",
        "answer": "可以，但是不可以互相抄襲",
      },
      {
        "id": 12,
        "question": "可以吃東西嗎？",
        "answer": "不可以，教室禁止飲食",
      },
      {
        "id": 13,
        "question": "寫完可以提早走嗎？",
        "answer": "可以，但是至少要待 20 分鐘"
      },
      {
        "id": 10,
        "question": "sdfjoisjroigetgsdfjoisjroigetgsdfjoisjroigetgsdfjoisjroigetgsdfjoisjroigetgsdfjoisjroigetgsdfjoisjroigetgsdfjoisjroigetgsdfjoisjroigetgsdfjoisjroigetgsdfjoisjroigetg",
        "answer": "sdfjeisjgrkh",
      },
      {
        "id": 11,
        "question": "馬拉松",
        "answer": "roijtidushrgdrt",
      },
      {
        "id": 1,
        "question": "八皇后",
        "answer": "sdfjeisjgrkh",
      },
      {
        "id": 2,
        "question": "八皇后",
        "answer": "sdfjeisjgrkh",
      },
      {
        "id": 3,
        "question": "八皇后",
        "answer": "sdfjeisjgrkh",
      },
      {
        "id": 4,
        "question": "八皇后",
        "answer": "sdfjeisjgrkh",
      },
      {
        "id": 5,
        "question": "八皇后",
        "answer": "sdfjeisjgrkh",
      },
      {
        "id": 6,
        "question": "八皇后",
        "answer": "sdfjeisjgrkh",
      },
      {
        "id": 7,
        "question": "八皇后",
        "answer": "sdfjeisjgrkh",
      },
      {
        "id": 8,
        "question": "八皇后",
        "answer": "sdfjeisjgrkh",
      },
    ]);
  }, []);
  return (
    <>
      <Typography align="center" variant="h4">
        Q    &    A
      </Typography>
      <ShowWindowDimensions/>
      <div className={classes.root}>
        {
          allClass.map((x) => (
            <Item key={x.id} item={x} className={classes.heading} />
          ))
        }
      </div>

      <Fab className={classes.fab} color="primary" aria-label="add" onClick="">
        <Add />
      </Fab>
    </>
  );
}

export default QAList
