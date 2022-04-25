import React, { useState, useEffect } from "react";
import "./HomePage.css";

const baseURL = "https://api.punkapi.com/v2/beers";

const HomePage = () => {
	//state
  	const [beers, setBeers] = useState([]);
  	const [maxLength, setMaxLength] = useState(0);
  	const [colors, setColors] = useState([]);

    const fetchUsers = async () => {
    const response = await fetch(`${baseURL}`);
    const data = await response.json();

    let maxLength = 0;	//maxLength--> max abv?
	let colors = [];	//random color array

	//Object > key:[values] --> isArray? > same abv - key, id numbers - values --> Ex. 4,5:[1,13,14] , 5.3:[12]
    const result = data.reduce((prev, curr) => {
      if (Array.isArray(prev[curr.abv])) prev[curr.abv].push(curr.id);
      else prev[curr.abv] = [curr.id];
      return prev;
    }, {});

	//maxLength--> find max abv
    Object.keys(result).forEach((el) => {
      if (result[el].length > maxLength) maxLength = result[el].length;
    });

	//Random colors array for each abv value --> 1-5 color --> bknz.HomePage.css color1, color2 ... color5
	Object.keys(result).forEach(() => {
		colors.push(Math.ceil(Math.random() * 5));
	});

	setColors(colors);
    setBeers(result);
	setMaxLength(maxLength);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="barchart-Wrapper">
      <div className="barChart-Container"> 
        <div className="barchart">
          {Object.keys(beers).map((el, idx) => {
            return (
              <div key={idx} className="barchart-Col">	
				  <div className="barchart-ColText">{beers[el].length}</div>
                <div
                  className={`barchart-Bar color${colors[idx]}`}
                  style={{ height: `${(100/maxLength)*beers[el].length}%` }}
                ></div>
                <div className="barchart-BarFooter">
                  <h3>{el}</h3>
                </div>
              </div>
            );
          })}
        </div>
		<label>abv</label>
      </div>
    </div>
  );
};

export default HomePage;
