import { useState } from "react";
import { Button, Form } from "react-bootstrap";

export const LoginView =({ onLoggedIn, url })=>{
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit= event =>{
    event.preventDefault();
    const data = {
      Username: username,
      Password: password
    };
    fetch(url+"/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    }).then(res=>res.json())
    .then(data=>{
      //console.log("Login response: ", data); // test login data
      if (data.user){
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("token", data.token); // don't stringify!
        onLoggedIn(data.user, data.token);
      } else alert("User not found.");
    }).catch(e=>alert("Problem with login."))
  };

  return (
    <Form onSubmit={ handleSubmit }>
      <Form.Group>
        <Form.Label>Username:</Form.Label>
          <Form.Control
          type="text"
          value={ username }
          onChange={ e => setUsername(e.target.value) }
          required
          minLength="5"
          autoComplete="on"
          pattern="[a-zA-Z0-9]+"
          title="Username can only contain alphanumeric characters."
          />
      </Form.Group>
      <Form.Group>
          <Form.Label>Password:</Form.Label>
          <Form.Control
          type="password"
          value={ password }
          onChange={ e => setPassword(e.target.value) }
          required
          minLength="10"
          autoComplete="on"
          />
        <Button variant="primary" type="submit">Submit</Button>
      </Form.Group>
    </Form>
  );
};