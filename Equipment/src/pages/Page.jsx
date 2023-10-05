import { Link } from 'react-router-dom';
import '../styles/Page.css';
import logo from '../assets/logo.jpg';
import { useEffect, useState } from 'react';
import axios from 'axios';

// import PDFDocument from '../components/Print';
// import { PDFViewer, PDFDownloadLink } from '@react-pdf/renderer';
// import { saveAs } from 'file-saver';

function Page() {
  const [staff, setStaff] = useState([]);
  const [filtered, setFiltered] = useState([]);


  const fetchStaff = async () => {
    const url = import.meta.env.VITE_STAFF;
    await axios.get(url).then(res => {
      setStaff(res.data?.data);
      setFiltered(res.data?.data); // Initially, set filtered data to all staff
    });
  };

  const handleFilter = (searchText) => {
    const fill = staff.filter(s => s.attributes.name.toLowerCase().includes(searchText.toLowerCase()));
    
    setFiltered(fill);
  };

  useEffect(() => {
    fetchStaff();
  }, []);

  const handleDelete = (e, id) => {
    e.preventDefault();

    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this record!",
      icon: "warning",
      buttons: ["Cancel", "Delete"],
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        // User clicked the "Delete" button
        const url = import.meta.env.VITE_LAPTOP_ADD;

        const token = localStorage.getItem("jwt");
        console.log(token);
        const headers = {
          Authorization: "Bearer " + token
        };

        axios.delete(url + "/" + id, { headers: headers })
          .then(response => {
            swal("UHAS", "Record Deleted Successfully", "success");
            console.log(response);

            // Fetch the updated staff list after deletion
            fetchStaff();
          })
          .catch(error => {
            console.log(error);
            swal("UHAS", "Error", "error");
          });
      } else {
        // User clicked the "Cancel" button or closed the dialog
        swal("UHAS", "Deletion Cancelled", "info");
      }
    });
  }

 

  // const handleDownloadPDF = () => {
  //   // Create a blob containing the PDF data
  //   const pdfBlob = PDFDocument({ data: filtered })?.toBlob();

  //   // Use file-saver to save the blob as a PDF file
  //   saveAs(pdfBlob, 'table_view.pdf');
  // };

  return (
    <div className='Page-page'>
      <div className='header'>
        <div className='page-img-link'>
          <img className='logo' src={logo} alt='logo' id='logo-page' />
        </div>
        <div>
        
          <h2 className="P_title">IT EQUIPMENT ASSET REGISTER</h2>
      </div>
        <div className='button'>
          <Link to={"/Add"} id='Link-add' className='Link'>
            ADD RECORD
          </Link>
        </div>
        <div className='search'>
          <button>Search</button>
          <input
            type='text'
            placeholder='search'
            name='search'
            className='Page-search'
            onChange={(e) => handleFilter(e.target.value)}
          />
          <button onClick={()=> window.print()} className='download'>Download PDF</button>
          
          {/* <PDFDownloadLink document={<PDFDocument data={filtered} />} fileName="table_view.pdf"> */}
        {/* {({ blob, url, loading, error }) =>
          loading ? 'Loading document...' : 'Download PDF'
        }
      </PDFDownloadLink> */}
        </div>
        <div className='header-list'>
          <table>
            <thead>
              <tr>
              
                <th>Name OF ASSET</th>
                <th>DESCRIPTION OF ASSET</th>
                <th>ASSET CODE</th>
                <th>SUPLIER/DONOR</th>
                <th> ASSET Serial number</th>
                <th>LOCATION</th>
                <th>ASSET OWNER</th>
                <th>ASSET USER</th>
                <th>Update</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length > 0 &&
                filtered.map((data, i) => (
                  <tr key={i}>
                    {/* <td className='photo'>
                      <img src={import.meta.env.VITE_HOST + data?.attributes?.photo.data?.attributes?.url} alt="" />
                    </td>*/}
                   
                    <td>{data?.attributes?.name}</td>
                    <td>{data?.attributes?.description}</td>
                    <td>{data?.attributes?.code}</td>
                    <td>{data?.attributes?.supplier}</td>
                    <td>{data?.attributes?.serial}</td>
                    <td>{data?.attributes?.location}</td>
                    <td>{data?.attributes?.owner}</td>
                    <td>{data?.attributes?.user}</td>
                    <td>
                         <div className="actions"> 
                         <Link  to={"/update/"+data.id } id='Link-update' className="update">Update</Link>
                       
					             </div>
                    </td>
                    <td>
                      <button className="delete" onClick={(e)=>handleDelete(e,data.id)}>Delete</button> 
                    
                    
                    </td>
						
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Page;
