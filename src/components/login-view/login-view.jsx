import { useState } from "react";

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
        localStorage.setItem("token", JSON.stringify(data.token));
        onLoggedIn(data.user, data.token);
      } else alert("User not found.");
    }).catch(e=>alert("Problem with login."))
  };

  return (
    <form onSubmit={ handleSubmit }>
      <label>Username:<input
        type="text"
        value={ username }
        onChange={ e => setUsername(e.target.value) }
        required
        minLength="5"
        autoComplete="on"
        pattern="[a-zA-Z0-9]+"
        title="Username can only contain alphanumeric characters."
      /></label>
      <label>Password:<input
        type="password"
        value={ password }
        onChange={ e => setPassword(e.target.value) }
        required
        minLength="10"
        autoComplete="on"
      /></label>
      <button type="submit">Submit</button>
    </form>
  );
};