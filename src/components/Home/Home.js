import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./Home.css";
import React, { useEffect, useState } from 'react';

const Home = ({ User, Authtoken, setLoading }) => {
  const [dnsData, setDnsData] = useState([]);
  const [recordType, setRecordType] = useState('');
  const [recordName, setRecordName] = useState('');
  const [searchTerm, setSearchTerm] = useState(''); 

  useEffect(() => {
    fetchDnsRecords();
  }, []);

  const fetchDnsRecords = async () => {
    try {
      const URL = `https://management.azure.com/subscriptions/<span class="math-inline">\{User\.subscriptionid\}/resourceGroups/</span>{User.resourcegroupname}/providers/Microsoft.Network/dnsZones/${User.Zone}/all?api-version=2018-05-01`;
      const { data } = await axios.get(URL, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: Authtoken,
        },
      });
      setDnsData(data.value);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleAddRecord = async () => {
    try {
      const URL = `https://management.azure.com/subscriptions/<span class="math-inline">\{User\.subscriptionid\}/resourceGroups/</span>{User.resourcegroupname}/providers/Microsoft.Network/dnsZones/<span class="math-inline">\{User\.Zone\}/</span>{recordType}/${recordName}?api-version=2018-05-01`;
      const requestBody = {
        properties: {
          metadata: {
            key1: "value1",
          },
          TTL: 3600,
          records: [
            {
              ipv4Address: "127.0.0.1", 
            },
          ],
        },
      };
      await axios.put(URL, requestBody, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: Authtoken,
        },
      });
      toast.success("Record added successfully");
      fetchDnsRecords(); 
    } catch (error) {
      toast.error("Error adding record:");
    }
  };

  const handleDeleteRecord = async () => {
    try {
      const URL = `https://management.azure.com/subscriptions/<span class="math-inline">\{User\.subscriptionid\}/resourceGroups/</span>{User.resourcegroupname}/providers/Microsoft.Network/dnsZones/<span class="math-inline">\{User\.Zone\}/</span>{recordType}/${recordName}?api-version=2018-05-01`;
      await axios.delete(URL, {
        headers: {
          "Content-Type": "application/json",
          Authorization: Authtoken,
        },
      });
      toast.success("Record Deleted Successfully");
      fetchDnsRecords(); 
    } catch (error) {
      toast.error("Error Deleting Record");
    }
  };

  const handleRefresh = () => {
    fetchDnsRecords();
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredRecords = dnsData.filter((record) =>
    record.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container">
      <div className="header">
        <h2>DNS Management Hub</h2>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search DNS Records"
            value={searchTerm}
            onChange={handleSearch}
          />
          <button onClick={handleRefresh}>Retrieve All DNS Records</button>
        </div>
      </div>
      <div className="record-management">
        <div className="record-inputs">
          <input
            type="text"
            placeholder="Record Type"
            value={recordType}
            onChange={(e) => setRecordType(e.target.value)}
          />
          <input
            type="text"
            placeholder="Record Name"
            value={recordName}
            onChange={(e) => setRecordName(e.target.value)}
          />
        </div>
        <div className="record-buttons">
          <button onClick={handleAddRecord}>Add Record</button>
          <button onClick={handleDeleteRecord}>Delete Record</button>
        </div>
      </div>
      <div className="record-list">
        <table>
          <thead>
            <tr>
              <th>DNS RECORDS</th>
              <th>DNS TYPE</th>
            </tr>
          </thead>
          <tbody>
            {filteredRecords.map((record, index) => (
              <tr key={index}>
                <td>{record.name}</td>
                <td>{record.type}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
