// src/pages/api/contacto-candidato.js

export async function POST({ request }) {
    
    // 1. CAMBIO AQUÍ: Usamos request.json() en lugar de formData()
    const data = await request.json();

    // 2. CAMBIO AQUÍ: Accedemos a los datos como un objeto
    const nombre = data.nombre;
    const email = data.email;
    const mensaje = data.mensaje;

    // (El resto del código es igual)
    console.log('NUEVO CONTACTO (CANDIDATO):');
    console.log('Nombre:', nombre);
    console.log('Email:', email);
    console.log('Mensaje:', mensaje);

    // Tarea Futura: Enviar el email...

    // 4. Enviamos una respuesta de ÉXITO al frontend
    return new Response(
        JSON.stringify({ message: "¡Mensaje recibido con éxito (JSON)!" }),
        { status: 200, statusText: "OK" }
    );
}