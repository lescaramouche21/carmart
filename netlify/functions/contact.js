export const handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: 'Method Not Allowed' }),
    };
  }

  if (!event.body) {
    return {
      statusCode: 400,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: 'Ontbrekende formuliergegevens.' }),
    };
  }

  let payload;
  try {
    payload = JSON.parse(event.body);
  } catch (error) {
    console.error('Invalid JSON payload', error);
    return {
      statusCode: 400,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: 'Ongeldige JSON-structuur verzonden.' }),
    };
  }

  const { name, email, phone, selectedPackage, message } = payload;

  if (!name || !email || !phone || !selectedPackage) {
    return {
      statusCode: 422,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message:
          'Controleer of naam, e-mail, telefoon en gekozen pakket zijn ingevuld voordat je opnieuw verzendt.',
      }),
    };
  }

  const webhookUrl = process.env.CONTACT_WEBHOOK_URL;

  if (!webhookUrl) {
    console.warn('CONTACT_WEBHOOK_URL is niet geconfigureerd in de Netlify omgeving.');
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message:
          'Formulier is nog niet geconfigureerd. Vraag de beheerder om CONTACT_WEBHOOK_URL in Netlify in te stellen.',
      }),
    };
  }

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        email,
        phone,
        selectedPackage,
        message,
        submittedAt: new Date().toISOString(),
        source: 'rijschool-studio-site',
      }),
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(`Webhook antwoordde met status ${response.status}: ${text}`);
    }

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: 'Bedankt! We nemen binnen 24 uur contact op.' }),
    };
  } catch (error) {
    console.error('Fout bij het versturen van de webhook', error);
    return {
      statusCode: 502,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: 'Versturen mislukt. Probeer het later opnieuw of neem direct telefonisch contact op.',
      }),
    };
  }
};
