import { useState, useEffect } from 'react';
import './App.css'

function App() {
  const [id, setId] = useState(156);
  const [phoneNumber, setPhoneNumber] = useState("341592493");
  const [buttonColor, setButtonColor] = useState(''); // Estado para el color del botón
  const [res, setres] = useState({})
  const sendWh = () => {
    // Mensaje predefinido
   if (typeof phoneNumber != "string" || phoneNumber == null) {
    return
   }
    
    const message = `¡Transforma la gestión de tu gimnasio con nuestra solución integral!

Estimado,Soy Arturo

¿Estás cansado de tener que recordar quién te pagó el mes y quién no? Te presento nuestro sistema de gestión de Gimnasios:

Todos tus usuarios activos con una foto para poder recordarlo
Un botón para mandarles un WhatsApp para poder comunicarte
Se pone en rojo cuando no pagaron el mes, fácil de identificar
Descripción para que no te olvides de algo en particular

¿Te gustaría saber más o agendar una demostración? Estoy a tu disposición para ayudarte a llevar tu gimnasio al siguiente nivel.

¡Espero poder colaborar contigo pronto!

Saludos cordiales`;
    
    const phoneNumberWithoutSpaces = phoneNumber.replace(/\s+/g, '').replace(/^0/, '');
    
    if (phoneNumberWithoutSpaces[3] === "4") {
      const whatsappUrl = `https://wa.me/549${phoneNumberWithoutSpaces}?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, "_blank");
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
      setres(data)

      console.log('res', res)
      if (data.number) {
       setPhoneNumber(data.number) 
      }
      
    

      console.log('data', data)
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
      <h1>{res?.number === null ? "Nulo" : res?.number}</h1>
    </>
  )
}

export default App;
