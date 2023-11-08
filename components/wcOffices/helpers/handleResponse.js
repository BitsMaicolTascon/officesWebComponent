const handleResponse = async (url) => {
    try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Error en la solicitud');
        }
        const data = await response.json();
        return data;
      } catch (error) {
        console.error('Error al leer el archivo JSON:', error);
        throw error;
      }
};

export default handleResponse;
