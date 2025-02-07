import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";
import axios from "axios";

const URL = "https://product-transactions-ca5a.onrender.com";
const BarChartComponent = ({ month }) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        setLoading(true);
        setError("");
        const response = await axios.get(`${URL}/bar-chart?month=${month+1}`);
        
        if (response.data.success && response.data.data) {
          const transformedData = Object.entries(response.data.data).map(([range, value]) => ({
            name: range,
            count: value
          }));
          console.log("transformedData",transformedData)
          setData(transformedData);
        } else {
          setError("Invalid data format from server.");
        }
      } catch (err) {
        setError("Error fetching bar chart data.");
      } finally {
        setLoading(false);
      }
    };

    fetchChartData();
  }, []);

  return (
    <div style={{ width: "100%", height: 300, textAlign: "center" ,marginTop:"20px"}}>
      <h3>Bar Chart for Month {month+1}</h3>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : (
        <ResponsiveContainer width="80%" height={250}>
          <BarChart data={data} barSize={30}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default BarChartComponent;
