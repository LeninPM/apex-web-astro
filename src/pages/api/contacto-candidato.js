// src/pages/api/contacto-candidato.js
export const prerender = false;
// 1. Importamos Resend
import { Resend } from "resend";

// 2. Inicializamos Resend usando la llave secreta del archivo .env
// Astro pone tus variables de .env en 'import.meta.env'
const resend = new Resend(import.meta.env.RESEND_API_KEY);

export async function POST({ request }) {
  try {
    // 3. Obtenemos los datos del formulario (esto ya lo teníamos)
    const data = await request.json();
    const nombre = data.nombre;
    const email = data.email;
    const mensaje = data.mensaje;

    // 4. ¡LA MAGIA! Enviamos el correo
    await resend.emails.send({
      // (Requerido) Cambia esto por tu email verificado en Resend
      // Para probar, Resend te deja usar 'onboarding@resend.dev'
      from: "Apex <onboarding@resend.dev>",

      // (Requerido) ¿A quién le llega? (¡El email de tu cliente!)
      // Reemplaza esto con el email real de Enrique
      to: "leninpruden09@gmail.com",

      // (Requerido) El asunto del correo
      subject: `Nuevo Contacto (Candidato): ${nombre}`,

      // (Requerido) El contenido del correo
      // Usamos HTML para que se vea bonito
      html: `
                <p>Has recibido un nuevo mensaje de un candidato:</p>
                <p><strong>Nombre:</strong> ${nombre}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Mensaje:</strong></p>
                <p>${mensaje}</p>
            `,
    });

    // 5. Respondemos al frontend con ÉXITO
    return new Response(
      JSON.stringify({ message: "¡Mensaje enviado con éxito!" }),
      { status: 200, statusText: "OK" }
    );
  } catch (error) {
    // 6. Si algo sale mal (ej. la API key es incorrecta)
    console.error("Error al enviar email:", error);
    return new Response(
      JSON.stringify({ message: "Error al enviar el mensaje." }),
      { status: 500, statusText: "Error interno del servidor" }
    );
  }
}
