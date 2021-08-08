import React, { useState } from "react";
import axios from 'axios'
import { useHistory } from "react-router-dom";

function Login(props) {
	const [username, setUsername] = useState();
	const [password, setPassword] = useState();

    let history = useHistory()

	async function submitHandler(e) {
        e.preventDefault();
        let res = await axios.post("/login",{username,password})
        await localStorage.setItem("token", res.data.token)
         await localStorage.setItem("isAdmin",res.data.isAdmin)
        props.setIsLoggedIn(true)
        let isAdmin = res.data.isAdmin
        if(isAdmin){
            history.push("/admin");
        }else{
            history.push("/user")
        }
    }   

	return (
		<>
			<div className="container">
				<div className="card login-caard">
					<h2>Login Form :</h2>
					<form onSubmit={submitHandler}>
						<input
							onChange={(e) => {
								setUsername(e.target.value);
							}}
							value={username}
							placeholder="Username"
						/>
						<input
							onChange={(e) => {
								setPassword(e.target.value);
							}}
							value={password}
                            type="password"
							placeholder="password"
						/>
                        <input type="submit" />
					</form>
				</div>
			</div>
		</>
	);
}

export default Login;
