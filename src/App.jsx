import { useState, useEffect } from 'react';
import './App.css'

function App() {
  const [id, setId] = useState(1);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [buttonColor, setButtonColor] = useState(''); // Estado para el color del botón

  const sendWh = () => {
    // Mensaje predefinido
    const message = "¡Hola! Este es un mensaje predefinido.";
    const phoneNumberWithoutSpaces = phoneNumber.replace(/\s+/g, '').replace(/^0/, '');
    if (phoneNumberWithoutSpaces[3] === "4") {
      console.log('no me puede mandar wh');
      // Aquí podrías bloquear el envío o manejar la lógica como prefieras
    } else {
      const whatsappUrl = `https://wa.me/549${phoneNumberWithoutSpaces}?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, "_blank");
    }
  };

  const newPhone = async () => {
    const apiUrl = `http://localhost:8080/api/phone/${id}`;
    try {
      const phone = await fetch(apiUrl);
      const data = await phone.json();
      setPhoneNumber(data.number);
      setId((prev) => prev + 1);
    } catch (error) {
      console.log(error);
    }
  };

  // Usar un efecto para actualizar el color del botón cuando cambia el número de teléfono
  useEffect(() => {
    const phoneNumberWithoutSpaces = phoneNumber.replace(/\s+/g, '').replace(/^0/, '');
    if (phoneNumberWithoutSpaces[3] === "4") {
      setButtonColor('red');
    } else {
      setButtonColor('');
    }
  }, [phoneNumber]); // Dependencia de phoneNumber para ejecutar el efecto cuando cambie

  return (
    <>
      {id}
      <button onClick={sendWh} style={{ backgroundColor: buttonColor }}>MAndar wh</button>
      <button onClick={newPhone}>Nuevo numero</button>
      <a href="https://api.whatsapp.com/send?phone=5493413592493">Haz clic aquí</a>
    </>
  )
}

export default App;
