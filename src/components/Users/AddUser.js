import React, { useState, useRef } from "react";

import Card from "../UI/Card";
import Button from "../UI/Button";
import ErrorModal from "../UI/ErrorModal";
import classes from "./AddUser.module.css";

const AddUser = (props) => {
  // ------------------------------
  // METHOD 1: use state to capture the user input
  // this approach captures every key stroke in the input field
  // ------------------------------
  // const [enteredUsername, setEnteredUsername] = useState("");
  // const [enteredAge, setEnteredAge] = useState("");
  // const [error, setError] = useState();
  // const addUserHandler = (event) => {
  //   event.preventDefault();
  //   if (enteredUsername.trim().length === 0 || enteredAge.trim().length === 0) {
  //     setError({
  //       title: "Invalid input",
  //       message: "Please enter a valid name and age (non-empty values).",
  //     });
  //     return;
  //   }
  //   if (+enteredAge < 1) {
  //     setError({
  //       title: "Invalid age",
  //       message: "Please enter a valid age (> 0).",
  //     });
  //     return;
  //   }
  //   props.onAddUser(enteredUsername, enteredAge);
  //   setEnteredUsername("");
  //   setEnteredAge("");
  // };
  // const usernameChangeHandler = (event) => {
  //   setEnteredUsername(event.target.value);
  // };
  // const ageChangeHandler = (event) => {
  //   setEnteredAge(event.target.value);
  // };
  // const errorHandler = () => {
  //   setError(null);
  // };
  // return (
  //   <div>
  //     {error && (
  //       <ErrorModal
  //         title={error.title}
  //         message={error.message}
  //         onConfirm={errorHandler}
  //       />
  //     )}
  //     <Card className={classes.input}>
  //       <form onSubmit={addUserHandler}>
  //         <label htmlFor="username">Username</label>
  //         <input
  //           id="username"
  //           type="text"
  //           value={enteredUsername}
  //           onChange={usernameChangeHandler}
  //         />
  //         <label htmlFor="age">Age (Years)</label>
  //         <input
  //           id="age"
  //           type="number"
  //           value={enteredAge}
  //           onChange={ageChangeHandler}
  //         />
  //         <Button type="submit">Add User</Button>
  //       </form>
  //     </Card>
  //   </div>
  // );
  // ------------------------------
  // METHOD 2: use ref hook to capture the user input
  // this approach captures only the final value of the input field
  // to use ref hook:
  // 1. call useRef() for each input field
  // 2. connect the ref to the html element like `ref={nameInputRef}`
  // 3. access the value using `ref.current.value`
  // ------------------------------
  const nameInputRef = useRef();
  const ageInputRef = useRef();
  const [error, setError] = useState();

  const addUserHandler = (event) => {
    event.preventDefault();

    const enteredUsername = nameInputRef.current.value;
    const enteredAge = ageInputRef.current.value;

    if (enteredUsername.trim().length === 0 || enteredAge.trim().length === 0) {
      setError({
        title: "Invalid input",
        message: "Please enter a valid name and age (non-empty values).",
      });
      return;
    }
    if (+enteredAge < 1) {
      setError({
        title: "Invalid age",
        message: "Please enter a valid age (> 0).",
      });
      return;
    }
    props.onAddUser(enteredUsername, enteredAge);

    // clear user input
    // *** IMPORTANT ***
    // we should NOT manipulate dom, however, if just reseting the values of input fields, it is fine
    nameInputRef.current.value = "";
    ageInputRef.current.value = "";
  };

  const errorHandler = () => {
    setError(null);
  };

  return (
    <div>
      {error && (
        <ErrorModal
          title={error.title}
          message={error.message}
          onConfirm={errorHandler}
        />
      )}
      <Card className={classes.input}>
        <form onSubmit={addUserHandler}>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            // connect ref here
            ref={nameInputRef}
          />
          <label htmlFor="age">Age (Years)</label>
          <input
            id="age"
            type="number"
            // connect ref here
            ref={ageInputRef}
          />
          <Button type="submit">Add User</Button>
        </form>
      </Card>
    </div>
  );
};

export default AddUser;
