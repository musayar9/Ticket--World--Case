import React from 'react'
import {BarLoader} from "react-spinners"
const Loading = () => {
  return (
    <div className="flex items-center justify-center h-[100vh] mx-auto">
      <BarLoader color="#060b26" height={10} width={250} />
    </div>
  );
}

export default Loading
