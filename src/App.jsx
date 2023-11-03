import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [value, setValue] = useState([]);
  const [filterCategory, setFilterCategory] = useState([]);
  const [detail, setDetail] = useState([]);
  
  
  useEffect(() => {
    axios.get("http://localhost:5030/api/activity").then((res) => {
      setValue(res.data.activity);
    });
  }, []);

  const newValue = [...new Set(value.map((item) => item.category))];
  console.log("newValue: ", newValue);

  // console.log(filterCategory);

  const handleClick = (category) => {
    const newData = value.filter((item) => item.category === category);
    setFilterCategory(newData);
  };
  console.log("filterCategory: ", filterCategory);
  const handelDetail = (id) => {
    axios.get(`http://localhost:5030/api/activity/${id}`).then((res) => {
      setDetail(res.data.activity);
    });
  };

  console.log("detail", detail);
  return (
    <>
      {value &&
        value.map((item, index) => (
          <div
            key={item._id}
            style={{
              display: "flex",
              alignItems: "center",
              flex: "wrap",
              padding: "5px",
            }}
          >
            <p>{item.title}</p>
            <img src={item.image[1].photo} width={50} height={50} />
            <p>
              {item.date} - {item.hour}
            </p>
            <button
              onClick={() => {
                handelDetail(item._id);
              }}
            >
              Detayları Gör
            </button>
          </div>
        ))}

      {newValue &&
        newValue.map((v) => (
          <button key={v} onClick={() => handleClick(v)}>
            {v}
          </button>
        ))}

      {filterCategory &&
        filterCategory.map((f) => <div key={f._id}>{f.title}</div>)}
    </>
  );
}

export default App;
