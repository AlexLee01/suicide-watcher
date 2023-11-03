import { useRef } from "react";
import { useState, useEffect } from "react";

import Modal from "../layout/Modal";
import Backdrop from "../layout/Backdrop";

import Card from "../UI/Card";
import classes from "./BlogCreate.module.css";
import { useHistory } from 'react-router-dom';

function BlogCreate(props) {
  const history = useHistory();
  //this part is to get the data;
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const day = String(currentDate.getDate()).padStart(2, "0");
  const hours = String(currentDate.getHours()).padStart(2, "0");
  const minutes = String(currentDate.getMinutes()).padStart(2, "0");
  const seconds = String(currentDate.getSeconds()).padStart(2, "0");
  const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

  const titleInputRef = useRef();
  //const imageInputRef = useRef();
  //const addressInputRef = useRef();
  const descriptionInputRef = useRef();

  const [ModalIsOpen, setModalIsOpen] = useState(false);

  function submitHandler(event) {

    event.preventDefault();

    const enteredTitle = titleInputRef.current.value;
    //const enteredImage = imageInputRef.current.value;
    //const enteredAddress = addressInputRef.current.value;
    const enteredDescription = descriptionInputRef.current.value;


    const BlogData = {
      title: enteredTitle,
      //image: enteredImage,
      time: formattedDate,
      description: enteredDescription,
      token: '2'
    };

    // 使用 fetch 发送数据到后端获取模型处理的结果
  
      fetch('http://127.0.0.1:5000/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: enteredDescription }),
      })
        .then(response => response.json())
        .then(data => {
          console.log('Success:', data);
          const modelResult = data.result;

          let assignedToken;
          switch (modelResult) {
            case 'indicator':
              assignedToken = 'suicide risk: 0';
              break;
            case 'ideation':
              assignedToken = 'suicide risk: 1';
              break;
            case 'behavior':
              assignedToken = 'suicide risk: 2';
              break;
            case 'attempt':
              assignedToken = 'suicide risk: 3';
              break;
            default:
              assignedToken = 'none';
          }
          BlogData.token = assignedToken;

          //this is the condition witch the modal is appeared;
          if (assignedToken != '0') {
            setModalIsOpen(true);
          }

          props.onAddBlog(BlogData);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
      


    // if (enteredDescription.includes('suicide')) {
    //   setModalIsOpen(true);
    //   BlogData.token = 'suicide';

    // } else {
    //   BlogData.token = 'No risk';

    // }
  }

  return (
    <div>
      <Card>
        <form className={classes.form} onSubmit={submitHandler}>
          <div className={classes.control}>
            <label htmlFor="title"> Blog Title</label>
            <input type="text" required id="title" ref={titleInputRef} />
          </div>
          {/* 
          <div className={classes.control}>
            <label htmlFor="token"> Token</label>
            <input type="tet" required id="image" ref={imageInputRef} />
          </div>
  
          <div className={classes.control}>
            <label htmlFor="time"> time</label>
            <input type="text" required id="time" ref={timeInputRef} />
          </div>
          */}

          <div className={classes.control}>
            <label htmlFor="description"> Blog Description</label>
            <textarea
              id="description"
              required
              rows="6"
              ref={descriptionInputRef}
            />
          </div>
          <button className={classes.action}>Post</button>
        </form>
      </Card>
      {ModalIsOpen && <Backdrop />}
      {ModalIsOpen && (
        <Card>
          <Modal />
        </Card>
      )}
    </div>
  );
}


export default BlogCreate;
