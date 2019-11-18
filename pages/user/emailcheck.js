import React, { useState,useEffect } from 'react'
import AppLayout from '../../components/AppLayout'
import { Segment, Dimmer, Loader, Image } from 'semantic-ui-react'
import  Router  from 'next/router';

const Emailcheck = () => {
    const [timeLeft, setTimeLeft] = useState(5);

    useEffect(() => {
      // exit early when we reach 0
      if (!timeLeft||timeLeft<0) {
          Router.push('/')
      };
  
      // save intervalId to clear the interval when the
      // component re-renders
      const intervalId = setInterval(() => {
  
  
        setTimeLeft(timeLeft - 1);
      }, 1000);
  
      // clear interval on re-render to avoid memory leaks
      return () => clearInterval(intervalId);
      // add timeLeft as a dependency to re-rerun the effect
      // when we update it
    }, [timeLeft]);
  
      return (
          <>
          <AppLayout>
                  <div>
                  
      <Segment
      textAlign='center'
      style={{ minHeight: 550, padding: '1em 0em' }}
      vertical
      
      >
        <Dimmer active inverted>
          <Loader size='large'>이메일을 체크하세요 5초후 홈으로 이동</Loader>
        </Dimmer>
  
        <Image src='/images/wireframe/short-paragraph.png' />
      </Segment>
  
                  </div>
  
  
          </AppLayout>
          </>
      )
}


export default Emailcheck;
