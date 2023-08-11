import axios from 'axios'
import { useState } from 'react'

function Register({ setMessage }) {
  const [username, setUserName] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post('/register', {username, password}).then(({ data }) => {
        if (data?.id) {
          setMessage("success", "Register Sucessfully")
        } else {
          setMessage("error", data?.message ?? "Something Went Wrong")
        }
      })
    }
    catch (error) {
      console.error(error)
      setMessage("error", error?.response?.data?.message ?? "Something Went Wrong")
    }
  }
  
  return (
    <div className="App container mt-5 col-md-4">
      <h1>Register Page</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label for="email">User Name:</label>
          <input type="text" className="form-control" placeholder="Enter User Name" id="username"
            onChange={(e) => {
              setUserName(e.target.value)
            }}
            value={username}
            required />
        </div>
        <div className="form-group">
          <label for="pwd">Password:</label>
          <input type="password" className="form-control" placeholder="Enter password" id="pwd"
            onChange={(e) => {
              setPassword(e.target.value)
            }}
            value={password}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
}

export default Register;
