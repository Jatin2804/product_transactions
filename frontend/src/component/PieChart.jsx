import React, { useEffect, useState } from "react";
import { PieChart, Pie, Tooltip, ResponsiveContainer } from "recharts";
import axios from "axios";

const URL = "http://localhost:3000";

const PieChartComponent = ({ month }) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        setLoading(true);
        setError("");
        const response = await axios.get(`${URL}/pie-chart?month=${month+1}`);

        if (response.data.success && response.data.data) {
       
          const transformedData = Object.entries(response.data.data).map(([category, value]) => ({
            name: category,
            value: value
          }));
          
          console.log("Pie Chart Data:", transformedData);
          setData(transformedData);
        } else {
          setError("Invalid data format from server.");
        }
      } catch (err) {
        setError("Error fetching pie chart data.");
      } finally {
        setLoading(false);
      }
    };

    fetchChartData();
  }, []);

  return (
    <div style={{ width: "100%", height: 300, textAlign: "center",marginTop:"50px" }}>
      <h3>Pie Chart for Month {month+1}</h3>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              dataKey="value"
              data={data}
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              label
            />
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default PieChartComponent;
