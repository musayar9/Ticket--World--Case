import { useEffect } from "react"
import { useActivityAxiosApi } from "../customHooks"

export default function CardSlider() {
    const [concertData] = useActivityAxiosApi()
    console.log(concertData)
    return (<>
        {/* <div>
        <div className="header">
          <div className="container">
              <div className="slider">
                {concertData.map((item, index) => (
                  <div
                    key={item.id}
                    className="testimonal"
                    id={`testimonal-${index + 1}`}>
                    <div className="img">
                      <img
                        src={item.url}
                        alt="img not found"
                        className="user"
                      />
                    </div>
                  </div>
                ))}
              </div>
       
            <div className="slider-btn">
              {data.map((item, index) => (
                <a
                  key={item.id}
                  onClick={() => handleActiveIndex(index)}
                  href={`#testimonal-${index + 1}`}>
                  <span
                    className={`dot ${
                      activeIndex === index ? "active" : ""
                    } `}></span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div> */}
    </>)
}