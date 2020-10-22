import React from "react";

const Results = (props) => {
  return(
    <div className="weather__info">
      {props.data.information.length > 0 &&
      props.data.information.map(info => { return ( 
        info.check && (
          <p className="weather__key" key={info.label}>
            {" "}
            {info.label}
            <span className="weather__value">
              {" "}
              {info.result}
            </span>
          </p>
        )
      )})}
      {props.data.error && (
        <p className="weather__error">{props.data.error}</p>
      )}
    </div>
  )
}

export default Results;