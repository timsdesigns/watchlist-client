import { useState } from "react";
import { Form, Button } from "react-bootstrap";

export const SignupView =({ url })=>{
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");

  const handleSubmit = event =>{
    event.preventDefault();
    const data = {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday
    };
    fetch(url+"/users/", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(res=>{
      if (res.ok){
        alert("Signup success.");
        window.location.reload();
      }else alert("Signup failed.");
    });
  };

  return (
    <Form onSubmit={ handleSubmit }>
      <Form.Group controlId="formUsername">
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
      <Form.Group controlId="formPassword">
        <Form.Label>Password:</Form.Label>
          <Form.Control
            type="password"
            value={ password }
            onChange={ e => setPassword(e.target.value) }
            required
            minLength="10"
            autoComplete="on"
          />
      </Form.Group>
      <Form.Group controlId="formEmail">
        <Form.Label>Email:</Form.Label>
          <Form.Control
            type="email"
            value={ email }
            onChange={ e => setEmail(e.target.value) }
            required
            />
      </Form.Group>
      <Form.Group controlId="formBirthday">
        <Form.Label>Birthday:</Form.Label>
        <Form.Control
          type="date"
          value={ birthday }
          onChange={ e => setBirthday(e.target.value) }
          required
          />
      </Form.Group>
      <Button variant="primary" type="submit">Submit</Button>
    </Form>
  );
};