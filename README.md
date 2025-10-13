# Rijschool Studio De Vries

Een moderne single-page website voor de online lesstudio van Rijschool De Vries. Leerlingen ontdekken het complete leerpad, bekijken on-demand videolessen en kunnen zich direct aanmelden voor een proefles.

## Hoogtepunten

- Heldere hero-sectie met statistieken over geslaagde leerlingen en een directe call-to-action.
- Programma-overzicht waarin de fases van het traject en live community sessies worden toegelicht.
- Videobibliotheek met filterknoppen voor theorie-, praktijk- en examenvideo's.
- Fotogalerij, testimonials, tarieven en een uitgebreide FAQ voor vertrouwen en duidelijkheid.
- Aanmeldformulier met interactieve toastmelding en vloeiende smooth-scroll navigatie.

## Aan de slag

Open `index.html` in je browser om de site te bekijken. Alle styling en interactiviteit staan in `styles.css` en `script.js`.

### Netlify functies & secrets

Het contactformulier maakt gebruik van een Netlify Function (`/.netlify/functions/contact`) zodat gevoelige webhook- en API-sleutels veilig als environment variables kunnen worden opgeslagen. Stel in Netlify een variabele `CONTACT_WEBHOOK_URL` in die verwijst naar de uiteindelijke bestemming van formulierinzendingen (bijvoorbeeld een CRM, Zapier- of Make-hook).

Voor lokale ontwikkeling:

1. Kopieer `.env.example` naar `.env` en vul `CONTACT_WEBHOOK_URL` met een testendpoint.
2. Installeer de Netlify CLI en start een lokale server met functies via `netlify dev`.

### Statische preview draaien

Voor een snelle statische preview zonder functies kun je de site lokaal serveren zodat afbeeldingen en externe bronnen correct laden. Het contactformulier werkt dan niet, maar toont een foutmelding zodra je probeert te versturen:

```bash
python3 -m http.server 8000
```

Bezoek daarna [http://localhost:8000](http://localhost:8000).
