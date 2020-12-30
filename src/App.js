import React, { useState, useEffect } from "react";

import "./App.css";

const useFetch = url => {
  const [responseJson, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(async () => {
      const requestOptions = {
          method: 'GET',
          headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*',
          }
      };
    const response = await fetch(url,requestOptions);
    const responseJson = await response.json();
    console.log(responseJson);
    setData(responseJson);
    setLoading(false);
  }, []);

  return { responseJson, loading };
};

export default () => {
  const { responseJson, loading } = useFetch("https://hs-scrapper-backend.herokuapp.com/sozluk/topics");
  const baseUrl = "//www.eksisozluk.com";

  let topicList = "Loading...";
  if(loading === false){
    topicList = responseJson.data.topicList.map((topic, index) =>
        <tr key={index}>
          <td id='ordering'>{index + 1}</td>
          <td>
            <a href={baseUrl + topic.topicUrl}>{topic.topicTitle}</a>
          </td>
          <td id='commentTotal'>{topic.commentTotal}</td>
        </tr>
    );
  }

  return (
      <div>
        <div className='topic-list'>
          <table class='styled-table'>
            <thead>
            <tr>
              <th>Ordering</th>
              <th>Topic</th>
              <th>Total Comments</th>
            </tr>
            </thead>
            <tbody>
            {topicList}
            </tbody>
          </table>
        </div>
      </div>
  );
};
