import React, {useState, useEffect, useContext} from 'react';
import Router from 'next/router';
import {Button, Input ,Dimmer, Loader, Image, Segment} from 'semantic-ui-react'
const Timer = ({ seconds }) => {
  // initialize timeLeft with the seconds prop
  const [timeLeft, setTimeLeft] = useState(seconds);

  useEffect(() => {
    // exit early when we reach 0
    if (!timeLeft) return Router.push('/trade/cancle');

    // save intervalId to clear the interval when the
    // component re-renders
    const intervalId = setInterval(() => {
      console.log(timeLeft)

      setTimeLeft(timeLeft - 1);
    }, 1000);

    // clear interval on re-render to avoid memory leaks
    return () => clearInterval(intervalId);
    // add timeLeft as a dependency to re-rerun the effect
    // when we update it
  }, [timeLeft]);
  function date(){


    var hr  = parseInt(timeLeft/3600);
    var min = parseInt((timeLeft - (hr * 3600))/60);
    var sec = parseInt((timeLeft - (hr * 3600) -  (min * 60)));

    var strmin=String(min);

    var strsec=String(sec)

    if(min<10){
      strmin="0"+String(min)
    }
    if(sec<10){
      strsec="0"+String(sec);
    }

    let time = strmin+":"+strsec;

    return time;


  }
  return (
    <div>
      <h1>남은시간 :{date()}</h1>

    </div>
  );
};

export default Timer;