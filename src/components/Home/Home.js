import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./Home.css"
import React, { useEffect, useState } from 'react';


const Home = ({ User, Authtoken,setLoading }) => {
  const [dnsdata, setdnsdata] = useState([]);
  const [recordType, setRecordType] = useState('');
  const [recordName, setRecordName] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const handleRefresh = () => {
    window.location.reload();
  }

  const handleSearch = async () => {
    try {
      const URL = `https://management.azure.com/subscriptions/${User.subscriptionid}/resourceGroups/${User.resourcegroupname}/providers/Microsoft.Network/dnsZones/${User.Zone}/all?api-version=2018-05-01`;
      const { data } = await axios.get(URL, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: Authtoken,
        },
      });
      setdnsdata(data.value);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleAddRecord = async () => {
    try {
      const URL = `https://management.azure.com/subscriptions/${User.subscriptionid}/resourceGroups/${User.resourcegroupname}/providers/Microsoft.Network/dnsZones/${User.Zone}/${recordType}/${recordName}?api-version=2018-05-01`;
      const r=`${recordName}Records`
      const requestBody = {
        properties: {
          metadata: {
            key1: "value1",
          },
          TTL: 3600,
          r: [
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
    } catch (error) {
      toast.error("Error adding record:");
    }
  };

  const handleDeleteRecord = async () => {
    try {
      const URL = `https://management.azure.com/subscriptions/${User.subscriptionid}/resourceGroups/${User.resourcegroupname}/providers/Microsoft.Network/dnsZones/${User.Zone}/${recordType}/${recordName}?api-version=2018-05-01`;
      await axios.delete(URL, {
        headers: {
            "Content-Type": "application/json",
            Authorization: Authtoken,
          }
      });
      toast.success("Record Deleted Succesfully");
    } catch (error) {
        toast.error("Not Deleted");
    }
  };

  useEffect(() => {
    handleSearch();
  }, [dnsdata])

  // Filter DNS records based on search query
  const filteredDnsData = dnsdata.filter(record =>
    record.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <div className="search">
        <div className='searchfield'>
          <button onClick={handleRefresh}>Retrieve All DNS Records</button>
          <input
            type="text"
            placeholder="Search DNS Records"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      <div className="add-update-delete">
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
        <button onClick={handleAddRecord}>Add Record</button>
        <button onClick={handleDeleteRecord}>Delete Record</button>
      </div>
      <div className="container">
        <h3>DNS TABLE</h3>
        <table>
          <thead>
            <tr>
              <th>DNS RECORDS</th>
              <th>TYPE</th>
            </tr>
          </thead>
          <tbody>
            {filteredDnsData.map((th, index) => (
              <tr key={index}>
                <td>{th.name}</td>
                <td>{th.type}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Home;