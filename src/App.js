import React, { useState, useEffect } from "react";

import "./App.css";

const useFetch = url => {
  const [responseJson, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(async () => {
    const response = await fetch(url);
    const responseJson = await response.json();
    console.log(responseJson);
    setData(responseJson);
    setLoading(false);
  }, []);

  return { responseJson, loading };
};

export default () => {
  const { responseJson, loading } = useFetch("http://localhost:8080/sozluk/topics");
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
