import React, { useEffect, useState } from "react";
import "./DealersTable.css";
import { useNavigate } from 'react-router-dom';


const ITEMS_PER_PAGE = 20;

function DealersTable() {
  // State for all dealers fetched from API
  const [dealers, setDealers] = useState([]);
  // State for dealers after applying filters
  const [filteredDealers, setFilteredDealers] = useState([]);

  // State for filter inputs and pagination
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFirma, setVersionFilter] = useState(""); // This will filter by HoofdQWaarde
  const [currentPage, setCurrentPage] = useState(1);

  // 1. Fetch data from the API when the component mounts
  useEffect(() => {
    const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:5000";
    fetch(`${apiUrl}/api/xmlfiles`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched Data:", data);
        setDealers(data); // Update state with the fetched array
      })
      .catch((err) => console.error("Error fetching data:", err));
  }, []);

  // 2. Apply search & filters whenever dealers or filter inputs change
useEffect(() => {
    let filtered = dealers.filter((d) => {
      const search = (searchTerm || "").toLowerCase();
      
      // Check for a match in the dealer's name
      const matchesName = (d.Firma || "").toLowerCase().includes(search);
      
      // Check for a match in the filename
      const matchesFilename = (d.filename || "").toLowerCase().includes(search);

      // A match is found if EITHER the name OR the filename includes the search term
      const matchesSearch = matchesName || matchesFilename; 

      // This part remains the same
      const matchesVersion = selectedFirma ? d.HoofdQWaarde === selectedFirma : true;
      
      return matchesSearch && matchesVersion;
    });

    setFilteredDealers(filtered);
    setCurrentPage(1);
}, [dealers, searchTerm, selectedFirma]);



  // 3. Calculate pagination based on the filtered list
  const totalPages = Math.ceil(filteredDealers.length / ITEMS_PER_PAGE);
  const paginatedDealers = filteredDealers.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };


//   const handleRowClick = (filename) => {
//   console.log("Row clicked, fetching data for:", filename);

//   // You can now fetch the specific file's data
//   fetch(`http://localhost:5000/api/xmlfiles/${filename}`)
//     .then(response => {
//       if (!response.ok) {
//         throw new Error('Network response was not ok');
//       }
//       return response.json();
//     })
//     .then(data => {
//       // Now you have the detailed data for the clicked file
//       console.log('Received data:', data);
//       // You could display this data in a modal, a side panel,
//       // or navigate to a new page with it.
//       alert(`Data for ${filename}:\n${JSON.stringify(data, null, 2)}`);
//     })
//     .catch(error => {
//       console.error('There was a problem with the fetch operation:', error);
//     });
// };
const navigate = useNavigate();
 const handleRowClick = (filename) => {
  console.log("Navigating to details for:", filename);
  // This will change the URL and trigger the new page to render
  navigate(`/dealer/details/${filename}`);
};

  // 4. Render the component with filters, table, and pagination
  return (
    <div className="table-container">
      <h2 className="table-title">Dealers List</h2>

      {/* Filters */}
      <div className="filters">
        <input
          type="text"
          placeholder="Search Dealer Name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          value={selectedFirma}
          onChange={(e) => setVersionFilter(e.target.value)}
        >
          <option value="">All Types</option>
          {/* Dynamically create options from unique HoofdQWaarde values in the data */}
          {[...new Set(dealers.map(d => d.HoofdQWaarde))].map(value => (
            <option key={value} value={value}>{value}</option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>S/No</th>
             {/* <th>Filename</th> */}
              <th>Namespace</th>
              <th>Version</th>
              <th>Patched Date</th>
              <th>Users</th>
              <th>Licensed Users</th>
              <th>IPAddress</th>
              {/*<th>isHSP</th>
              <th>TimeStamp</th> */}
            </tr>
          </thead>
          <tbody>
            {paginatedDealers.length > 0 ? (
              paginatedDealers.map((dealer, index) => (
                <tr key={dealer.filename} onClick={() => handleRowClick(dealer.filename)} style={{ cursor: 'pointer' }} >
                  <td>{(currentPage - 1) * ITEMS_PER_PAGE + index + 1}</td>
                 {/* <td>{dealer.filename}</td> */}
                  <td>{dealer.namespace}</td>
                  <td>{dealer.Version}</td>
                  <td>{dealer.PatchedDate}</td>
                  <td>{dealer.Users}</td>
                  <td>{dealer.LicensedUsers}</td>
                  <td>{dealer.IPAddress}</td>
                  {/*<td>{dealer.isHSP ? "Yes" : "No"}</td>
                  <td>{dealer.TimeStamp}</td> */}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" style={{ textAlign: "center" }}>
                  No dealers found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="pagination">
          <button onClick={handlePrev} disabled={currentPage === 1}>
            Prev
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button onClick={handleNext} disabled={currentPage === totalPages}>
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default DealersTable;