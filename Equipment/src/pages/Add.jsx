import { useState } from 'react';
import add from '../styles/add.css';
import logo from '../assets/logo.jpg';
import {Link, useNavigate} from 'react-router-dom';
import swal from 'sweetalert';
import axios from 'axios';

function Add () {
 {/*const [image,setImage] = useState(null); */} 
  const[serial,setSerial] = useState('');
  const[name,setName] = useState('');
  const navigate = useNavigate();
  {/* const[lastName,setLastName] = useState(''); */}
  const[description,setDescription] = useState('');
  const[code,setCode] = useState('');
  const[supplier,setSupplier] = useState('');
  const[location,setLocation] = useState('');
  const[owner,setOwner] = useState('');
  const[user,setUser] = useState('');
  const handleProfilePictureChange = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    setImage(file);

    
  };
  const handleAdd=async(e)=>{

      e.preventDefault();
      if(location===""||serial===""||description===""||name===""||code===""){
        swal("UHAS","All fields are required","warning")
        return;
      }
  const url = import.meta.env.VITE_LAPTOP_ADD;
   const formData = new FormData();
   formData.append("code",code)
   formData.append("serial",serial)
   formData.append("description",description)
   formData.append("name",name)
   formData.append("supplier",supplier)
   {/* formData.append("photo",image)*/}
   formData.append("location",location)
   formData.append("owner",owner)
   formData.append("user",user)
   
   
   const token = localStorage.getItem("jwt");
   console.log(token);
const headers = {
  Authorizaton: `Bearer ${token}`
}
   try {
    const response = await axios.post(url, {data:{
      "supplier":supplier,"code":code,"serial":serial,"location":location,"description":description,"name":name,"user":user,"owner":owner
    },headers})
    swal("UHAS", "Record Created Successfully", "success")
    navigate("/page")


    console.log(response);
   } catch (error) {
    console.log(error);
    swal("UHAS", "Error", "error")
   }


     
   }
    return(
        <div className="add-page-contain">
             
             <div className="add-form-contain">
              <img src={logo} id='logo-add' alt='logo' />
              <h2 className="add_title">IT EQUIPMENT ASSET REGISTER</h2>
              <form className='add-form'>
                {/* <div>
                  <label>Profile Picture:</label>
                <input
                  type="file"
                  id="profilePictureInput"
                  accept="image/*"
                  name="profilePicture"
                  className="input w-full  bg-gray-100 h-10 hidden"
                  onChange={(e)=>handleProfilePictureChange(e)}
                />
                </div> */}
               
                 <div>
                 <label>Name of Asset:</label>
                 
                <input type="text" id="name" placeholder="ASSET Name" name="name" onChange={(e) =>setName(e.target.value)} required value={name}/>
                {/* 
                <input type="text" id='Last_name' placeholder='Last Name' name="Last_name" onChange={(e) =>setLastName(e.target.value)} value={lastName}/>
                */}
                 </div>
                 <div>
                 <label>Description of ASSET:</label>
                <input type="text" id="description" placeholder="Description of Asset" name="description" onChange={(e) =>setDescription(e.target.value)} required value={description}/>
                 </div>
                 <div>
                 <label>ASSET CODE:</label>
                <input type="text" id="code" name="code" placeholder="ASSET CODE" onChange={(e) =>setCode(e.target.value)} required value={code}/>
                 </div>
               <div>
               <label>SUPPLIER / DONOR:</label>
                <input type="text" id="supplier" name='supplier' placeholder="SUPPLIER / DONOR" onChange={(e) =>setSupplier(e.target.value)}  value={supplier}/>
               </div>
                <div>
                <label> Serial number:</label>
                <input type="number" id="serial" name='serial' placeholder="Serial Number" required onChange={(e)=>setSerial(e.target.value)} value={serial}/>
                </div>
                 <div>
                  <label>Location</label>
                  <input type="text" id="location" name='location' placeholder='Location' onChange={(e)=>setLocation(e.target.value)} value={location}/>
                 </div>
                 <div>
                 <label>ASSET OWNER</label>
                 <input type='text' id ="owner" name='owner' placeholder='ASSET OWNER' onChange={(e)=>setOwner(e.target.value)} value={owner}/>
                 </div>
                 <div>
                 <label>ASSET USER</label>
                 <input type='text' id ="user" name='user' placeholder='ASSET USER' onChange={(e)=>setUser(e.target.value)} value={user}/>
                 </div>
                   <button type='button' className="cursor-pointer" onClick={(e)=> handleAdd(e)}>Submit </button>
                
              </form>
       
              
   
             </div>
        </div>
    )
}
export default Add;