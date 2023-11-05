import React, { useEffect, useState } from "react";
import axios from "axios";
import image from "./public/logo.png";
const Data = () => {
  const [value, setValue] = useState([]);
  const [filter, setFilter] = useState(value);
  const [loading, setLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [detail, setDetail] = useState("");
  const [head, setHead] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const resp = await axios.get("http://localhost:5030/api/activity");
        console.log("res", resp);
        if (resp.status !== 200) {
          setIsError(true);
          setLoading(false);

          return;
        }

        const data = resp.data.activity;
        setValue(data);
        if (value) {
          setFilter(data);
          setHead("all");
        }
      } catch (error) {
        setIsError(true);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) {
    return <h2>Loading ....</h2>;
  }
  if (isError) {
    return <h2>Data is not found</h2>;
  }
  const filterData = ["all", ...new Set(value.map((v) => v.category))];
  console.log("filterData", filterData);

  const handleFilter = (category) => {
    if (category === "all") {
      setFilter(value);
      setHead(category);
      return;
    }

    const filterValue = value.filter((v) => v.category === category);
    setFilter(filterValue);
    setHead(category);
  };

  console.log("value", value);
  console.log("filter", filter, filter.length);

  const handleDetail = (id) => {
    axios.get(`http://localhost:5030/api/activity/${id}`).then((res) => {
      setDetail(res.data.activity);
    });
  };
  console.log("detail", detail);
  return (
    <div>
      <>
        <img
          src={image}
          style={{ width: "120px", height: "120px" }}
          alt="logo"
        />

        {filterData.map((category) => (
          <button key={category} onClick={() => handleFilter(category)}>
            {category}
          </button>
        ))}
        {<h2>{head}</h2>}
        {filter &&
          filter.map((f) => (
            <div key={f._id}>
              <p key={f._id}>{f.title}</p>

              <img
                height={50}
                width={50}
                src={
                  f.image[0].photo === ""
                    ? "https://via.placeholder.com/600x400"
                    : f.image[0].photo
                }
              />
              <button onClick={() => handleDetail(f._id)}>Detail </button>
            </div>
          ))}

        <hr></hr>

        <h6>Detail Area</h6>
        {detail && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              marginBottom: "15px",
            }}
          >
            <p>{detail.title}</p>
            <p>{detail.location}</p>
            <img
              src={
                detail.image[0].photo === ""
                  ? "https://via.placeholder.com/600x400"
                  : detail.image[0].photo
              }
              style={{ width: "75px", height: "75px", borderRadius: "50%" }}
            />

            <iframe
              src={detail?.locationMap}
              width="600"
              height="450"
              style={{
                border: "0",
                borderRadius: "8px",
                boxShadow: "1px 1px 5px #888",
              }}
              allowFullScreen={true}
              referrerPolicy="no-referrer-when-downgrade"
              title="Location Map"
            ></iframe>
          </div>
        )}
      </>
    </div>
  );
};

export default Data;
