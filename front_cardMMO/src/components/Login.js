import React, { useState } from 'react';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from 'axios'


function Login() {
    const [pseudo, setPseudo] = useState("");
    const [password, setPassword] = useState("");

    const Submit = (event) => {
        const data = {Pseudo: pseudo, Password:password};
        event.preventDefault();
        axios({
            method: 'post',
            url: `http://localhost:3000/api/login`,
            data:data,
        })
        .then(function (response) {
          console.log(response)
            if(!response.data.auth){
            } else {
              localStorage.setItem("accessToken",response.data.accessToken)
              localStorage.setItem("refreshToken",response.data.refreshToken)
              window.location = "http://localhost:3001"
            }
        })
        .catch(function (error) {
            console.log(error);
        });
      }

    return(
        <div className="Login">
          <Form onSubmit={Submit}>
            <Form.Group size="lg" controlId="email">
              <Form.Label>Pseudo</Form.Label>
              <Form.Control
                autoFocus
                type="text"
                value={pseudo}
                onChange={(e) => setPseudo(e.target.value)}
              />
            </Form.Group>
            <Form.Group size="lg" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Button block size="lg" type="submit">
              Login
            </Button>
          </Form>
        </div>
    );
}
export default Login;