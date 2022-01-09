import React from "react";
import { useState} from "react";
import axios from "axios";
import "./Data.css";
import CountUp from 'react-countup'

function Data() {
  const [data, setData] = useState("");
  const [name, setName] = useState("");
  const [count, setCount] = useState(0);
  const [value, setvalue] = useState(false);
  const [time,setTime] = useState(false);
  
 

  const handle = () => {
    // API to post data into database
    if (data.length > 1) {

        setTime(true);
      axios
        .post("https://task-girishv.herokuapp.com/task", {
          name: data,
        })
        .then((res) => {
          window.alert("Added successfully");
          setName(data);
          setData("");
          setCount(count + 1);
          
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      window.alert("Please enter data");
    }
  };

  const handlee = () => {
    setData(name);
    setvalue(true);
  };
  //api to update the data
  const update = () => {
    setvalue(false);

    axios
      .post("https://task-girishv.herokuapp.com/update", {
        name: data,
      })
      .then((res) => {
        window.alert("Updated successfully");
        setName(data);
        setData("");
        setCount(count + 1);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <div className="heading">
        <img
          src="https://cdn.cutshort.io/public/companies/57e7c472a82f08367dca2a6e/precily-logo"
          alt="s"
        />
        <h1>Precily Tasks</h1>
      </div>

      <h3>API call Count : {count}</h3>
      <div className="sub-data">
        <input
          type="text"
          placeholder="enter task"
          required
          value={data}
          onChange={(e) => setData(e.target.value)}
        />
        <br />
        <br />
        <div className="btn">
          <button onClick={handle} className="btn-1">
            Add
          </button>
          {value ? (
            <button onClick={update} className="btn-3">
              Update
            </button>
          ) : (
            <button onClick={handlee} className="btn-2">
              Edit
            </button>
          )}
          <br />
        </div>
        <h3>{name}</h3>
        {
            time ?  <CountUp end = {2}seconds duration={2}/> : ""
        }
       
      </div>
    </div>
  );
}

export default Data;
