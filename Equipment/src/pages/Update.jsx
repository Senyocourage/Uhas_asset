import React, { useEffect, useState } from 'react'
import "../styles/update.css"
import logo from "../assets/logo.jpg"
import swal from 'sweetalert';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';


function Update(){
  const { id } = useParams();
  {/*const [image, setImage] = useState(''); */}
  
  const [hasChange, setHasChange] = useState(false);
  const [name, setName] = useState('');
  const navigate = useNavigate();
{/* const [description, setDescription] = useState(''); */}
 
  const [code, setCode] = useState('');
  const [description, setDescription] = useState('');
  const [serial, setSerial] = useState('');
  const [location, setLocation] = useState(''); 
  const [supplier,setSupplier] = useState('');
  const [owner,setOwner] = useState('');
  const[user,setUser] = useState('');
  const[detail,setDetail]= useState(''); // Initialize detail as null
 

  useEffect(() => {
    const fetchStaff = async () => {
      const url = import.meta.env.VITE_STAFF_DETAIL + id + "?populate=*";
      try {
        const res = await axios.get(url);
        setDetail(res.data?.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchStaff(); // Fetch data once the component mounts or the id parameter changes
  }, [id]);

  useEffect(() => {
    // Set the data into the state only if the detail is available
    if (detail) {
      setName(detail.attributes?.name); 
      setDescription(detail.attributes?.description);
      setCode(detail.attributes?.code);
      setSerial(detail.attributes?.serial);
      setSupplier(detail.attributes?.supplier);
      setOwner(detail.attributes?.owner);
      setUser(detail.attributes?.user);
      setLocation(detail.attributes?.location);

    }
  }, [detail]);

  const handleUpdate = async () => {
    const url = import.meta.env.VITE_LAPTOP_ADD;
    const formData = new FormData();
    formData.append("user", user);
    formData.append("serial", serial);
    formData.append("description", description); 
    formData.append("owner",owner);
    formData.append("name", name);
    formData.append("code", code);
    formData.append("supplier",supplier);
    formData.append("location",location);
    hasChange && formData.append();
   
    
   

    const data = {
      "code": code,
      "user": user,
      "serial": serial,
      "description": description,
      "name":name,
      "supplier": supplier,
      "location":location,
      "code":code,
      "owner":owner,
    
    };

    const token = localStorage.getItem("jwt");
    const headers = {
      Authorization: "Bearer " + token,
    };
    try {
      const response = await axios.put(url + "/" + id, { data }, { headers: headers });
      swal("UHAS", "Record Updated Successfully", "success");
      navigate("/page")
      console.log(response);
      
    } catch (error) {
      console.log(error);
      swal("UHAS", "Error", "error");
    }
  };
 {/*  const handleProfilePictureChange = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    setImage(file);
    setHasChange(true);
  }; */}
 

  if (!detail) {
    return <div>Loading...</div>;
  }
       return(
      
       
        <div className='update-page-contain'>
          <div className='update-form-contain'>
             <img src={logo} id='logo-add' alt='logo' className='update-logo' />
           
            <h2 className="update_title">IT EQUIPMENT ASSET REGISTER</h2>
            <h2 className="update_title">Update info: {id}</h2>
            <form className='update-form'>
             {/*
    
             <div>
                      <label>Profile Picture:</label>
                    <input
                      type="file"
                      id="profilePictureInput"
                      accept="image/*"
                      name="profilePicture"
                      className="input w-full  bg-gray-100 h-10 hidden"
                      onChange={(e)=>handleProfilePictureChange(e)}
                    />
                    </div>
              */}
                    
                    <div>
                     <label>Name of ASSET:</label>
                     <input type='text' placeholder="Asset name" id="name"  onChange={(e) =>setName(e.target.value)} value={name} required/>
                       
                    
                     </div>
                       <div>
                        <label>Description of Asset</label>
                        <input type='type' placeholder='Description of Asset' id="description"  onChange={(e) =>setDescription(e.target.value)} value={description} required/>
                     </div>
                    
                     <div>
                        <label>Asset Code:</label>
                        <input type='type' placeholder='Asset Code' id="code"  onChange={(e) =>setCode(e.target.value)} value={code} required/>
                     </div>
                     <div>
                   <label>Supplier / Donor:</label>
                    <input type="text" id="supplier" placeholder="Supplier / Donor:" onChange={(e) =>setSupplier(e.target.value)} required value={supplier}/>
                   </div>
                     <div>
                   <label> Serial number:</label>
                    <input type="number" id="serial" placeholder="Serial Number"  onChange={(e)=>setSerial(e.target.value)} value={serial} />
                    </div>
                     <div>
                      <label>Location</label>
                      <input type="text" id='location' placeholder='Location' onChange={(e)=>setLocation(e.target.value)} value={location}/>
                     </div>
                     <div>
                      <label>Asset owner</label>
                      <input type="text" id='owner' placeholder='Asset Owner' onChange={(e)=>setOwner(e.target.value)} value={owner}/>
                     </div>
                     <div>
                      <label>Asset User</label>
                      <input type="text" id='user' placeholder='Asset User' onChange={(e)=>setUser(e.target.value)} value={user}/>
                     </div>
                    
                     <button type='button' className="cursor-pointer" onClick={(e)=> handleUpdate(e)}>Update</button>
                    
                </form>
          </div>
        
         
        </div> 
       
     
      
    )
  }
  

       
export default Update;
