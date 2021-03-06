import React, { useRef, useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Typography, Accordion, AccordionSummary,
  AccordionDetails, Fab,
} from '@material-ui/core/';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { HelpOutline, MessageOutlined, Add, } from '@material-ui/icons';

import QAEdit from './QAEdit';

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
  const [QAEditOpen, setQAEditOpen] = useState(false);
  const handleQAEditOpen = () => setQAEditOpen(true);
  const handleQAEditClose = () => setQAEditOpen(false);

  useEffect(() => {
    setAllClass([
      {
        "id": 15,
        "question": "??????????????????????????????????????????",
        "answer": "????????????????????????????????????",
      },
      {
        "id": 12,
        "question": "?????????????????????",
        "answer": "??????????????????????????????",
      },
      {
        "id": 13,
        "question": "???????????????????????????",
        "answer": "??????????????????????????? 20 ??????"
      },
      {
        "id": 10,
        "question": "sdfjoisjroigetgsdfjoisjroigetgsdfjoisjroigetgsdfjoisjroigetgsdfjoisjroigetgsdfjoisjroigetgsdfjoisjroigetgsdfjoisjroigetgsdfjoisjroigetgsdfjoisjroigetgsdfjoisjroigetg",
        "answer": "sdfjeisjgrkh",
      },
      {
        "id": 11,
        "question": "?????????",
        "answer": "roijtidushrgdrt",
      },
      {
        "id": 1,
        "question": "?????????",
        "answer": "sdfjeisjgrkh",
      },
      {
        "id": 2,
        "question": "?????????",
        "answer": "sdfjeisjgrkh",
      },
      {
        "id": 3,
        "question": "?????????",
        "answer": "sdfjeisjgrkh",
      },
      {
        "id": 4,
        "question": "?????????",
        "answer": "sdfjeisjgrkh",
      },
      {
        "id": 5,
        "question": "?????????",
        "answer": "sdfjeisjgrkh",
      },
      {
        "id": 6,
        "question": "?????????",
        "answer": "sdfjeisjgrkh",
      },
      {
        "id": 7,
        "question": "?????????",
        "answer": "sdfjeisjgrkh",
      },
      {
        "id": 8,
        "question": "?????????",
        "answer": "sdfjeisjgrkh",
      },
    ]);
  }, []);
  return (
    <>
      <QAEdit QAEditopen={QAEditOpen} handleQAEditClose={handleQAEditClose}/>
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

      <Fab className={classes.fab} color="primary" aria-label="add" onClick={handleQAEditOpen}>
        <Add />
      </Fab>
    </>
  );
}

export default QAList
