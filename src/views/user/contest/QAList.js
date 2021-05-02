import React, { useRef, useState, useEffect} from 'react';
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
    maxWidth: props => props * 0.8,
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

const Item = (props) => {
  const [width, setWidth] = useState(0);
  const ref = useRef();
  const handleResize = () => {
    setWidth(ref.current.offsetWidth)
  }
  useEffect(() => {
    setWidth(ref.current.offsetWidth);
  }, [ref.current]);
  window.addEventListener('resize', handleResize)
  const classes = useStyles(width);
  const x = props.item;

  return (
    <>
      <Accordion ref={ref} >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
        >
          <Typography className={classes.qatitle}
            component="p" align="left">
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
      <div className={classes.root}  >
        {
          allClass.map((x) => (
            <Item key={x.id} item={x} />
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
