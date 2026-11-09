// src/services/getUser.ts

interface User {
  id: number;
  name: string;
  email: string;
}

export async function getUser(userId: number): Promise<User> {
  try {
    const response = await fetch(`https://api.example.com/users/${userId}`);

    // IMPORANTE: fetch NO lanza error en respuestas 4xx o 5xx. 
    // Hay que verificar manualmente si la respuesta fue exitosa (response.ok).
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status} - ${response.statusText}`);
    }

    const data: User = await response.json();
    return data;
  } catch (error) {
    console.error('Falló la petición:', error);
    throw error;
  }
}