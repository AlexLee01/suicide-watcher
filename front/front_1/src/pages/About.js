import Card from "../conponents/UI/Card";
import BG from "../conponents/layout/BackGround";
import classes from './About.module.css'
function About_Page() {
  return (
    <div>
    <BG>
      <Card>
        <h1>Content1</h1>
        <p1>
          This concerning trend has spurred our team to propose a method for
          identifying individuals with suicidal tendencies on social media
          platforms. Recognizing the signs of potential self-harm or suicide
        </p1>
      </Card>
      <Card>
        <h1>Content2</h1>
        <p1>
          The development of this system involves training algorithms on a large
          dataset of social media posts from individuals who have previously
          exhibited suicidal tendencies. By learning patterns, linguistic cues,
        </p1>
      </Card>
      <Card>
        <h1>Content3</h1>
        <p1>
          It is crucial to emphasize that our system is not a substitute for
          professional mental health services. Its purpose is to serve as an
          additional tool to aid designated moderators, mental health
        </p1>
      </Card>
      <Card>
        <h1>Content4</h1>
        <p1>
          This front-end model is designed to detect whether high-risk posts are
          generated in the community and provide them to the detectors for
          review This timely notification enables proactive intervention and
        </p1>
      </Card>
    </BG>
    <div className={classes.rectangle1}></div>
    <div className={classes.rectangle2}></div>
    </div>
  );
}

export default About_Page;
