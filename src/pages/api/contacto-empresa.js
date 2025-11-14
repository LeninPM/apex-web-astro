// src/pages/api/contacto-empresa.js

// ¡La línea clave para que funcione en el servidor!
export const prerender = false;

import { Resend } from "resend";
const resend = new Resend(import.meta.env.RESEND_API_KEY);

export async function POST({ request }) {
  try {
    // 1. Obtenemos los datos del formulario
    const data = await request.json();

    // 2. Definimos los campos para ESTE formulario
    const nombre = data.nombre;
    const email = data.email;
    const telefono = data.telefono;
    const empresa = data.empresa;
    const mensaje = data.mensaje;

    // 3. Enviamos el correo
    await resend.emails.send({
      // Para probar, usamos onboarding@resend.dev
      from: "Apex <onboarding@resend.dev>",

      // ¡Va a tu mismo correo de prueba!
      to: "leninpruden09@gmail.com",

      // ¡Cambiamos el asunto!
      subject: `Nuevo Contacto (EMPRESA): ${empresa}`,

      // El contenido del correo
      html: `
                <p>Has recibido un nuevo mensaje de una empresa:</p>
                <p><strong>Nombre de Empresa:</strong> ${empresa}</p>
                <p><strong>Nombre de Contacto:</strong> ${nombre}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Teléfono:</strong> ${telefono}</p>
                <p><strong>Mensaje:</strong></p>
                <p>${mensaje}</p>
            `,
    });

    // 4. Respondemos al frontend con ÉXITO
    return new Response(
      JSON.stringify({ message: "¡Mensaje de Empresa enviado!" }),
      { status: 200, statusText: "OK" }
    );
  } catch (error) {
    console.error("Error al enviar email (Empresa):", error);
    return new Response(
      JSON.stringify({ message: "Error al enviar el mensaje." }),
      { status: 500, statusText: "Error interno del servidor" }
    );
  }
}
