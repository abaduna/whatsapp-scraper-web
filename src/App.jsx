
import { useState } from 'react';
import './App.css'

function App() {
  const  [id,setId]=useState(1)
  const [phoneNumber,setPhoneNumber]=useState(0)

 const sendWh =()=>{
  // Mensaje predefinido
  const message = "¡Hola! Este es un mensaje predefinido.";
  const phoneNumberWithoutSpaces = phoneNumber.replace(/\s+/g, '');
  const whatsappUrl = `https://wa.me/549${phoneNumberWithoutSpaces}?text=${encodeURIComponent(message)}`;
console.log(whatsappUrl);

  window.open(whatsappUrl, "_blank");
 }
const newPhone=async()=>{
const apiUrl = `http://localhost:8080/api/phone/${id}`
try {
  const phone = await fetch(apiUrl);
  const data = await phone.json();
  console.log('data', data)
  setPhoneNumber(data.number)
  setId((prev)=>prev+1)
} catch (error) {
  console.log(error);
  
}
}
  return (
    <>
    {id}
  <button onClick={sendWh}>MAndar wh</button>
  <button onClick={newPhone}>Nuevo numero</button>
    </>
  )
}

export default App
