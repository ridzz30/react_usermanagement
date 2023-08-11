import axios from "axios";
import EditModel from "./editModel";
import DeleteModel from "./deleteModel";
import ViewModal from "./viewModel";
import { useEffect, useState } from "react";

function User({setMessage}) {
  const [data, setData] = useState([])
  const getUser = async() => {
    try{
      await axios.get('/users').then(({data})=>{
        setData(data ?? [])
      })
    }
    catch(error){
      console.error(error)
    }
  }

  useEffect(()=>{
    getUser()
  },[])

  return (
    <div className="App container mt-5 mb-3 col-md-6">
      <h1>User List Page</h1>
      <table className="table mt-2">
        <thead>
          <tr>
            <th>ID</th>
            <th>UserName</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item,index) => {
            return <tr key={index}>
              <td>{item.id}</td>
              <td>{item.username}</td>
              <td>
                <ViewModal index={index} item={item}/>
                <EditModel index={index} item={item} setMessage={setMessage} getUser={getUser}/>
                <DeleteModel index={index} item={item} setMessage={setMessage} getUser={getUser}/>
              </td>
            </tr>
          })}
        </tbody>
      </table>

    </div>
  );
}

export default User;
