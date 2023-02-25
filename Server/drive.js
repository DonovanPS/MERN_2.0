const { google} = require('googleapis');
const { content } = require('googleapis/build/src/apis/content');
const key = require('./json/credenciales.json');
const scopes = 'https://www.googleapis.com/auth/drive';

let contenido = "";


const auth = new google.auth.JWT(
    key.client_email,
    null,
    key.private_key,
    scopes
  );

const drive = google.drive({ version: 'v3', auth });

drive.files.list({
  q: "trashed = false",
  fields: 'nextPageToken, files(id, name)',
}, (err, res) => {
  if (err) return console.error('Error al obtener la lista de archivos:', err);
  const files = res.data.files;
  if (files.length) {
    console.log('Archivos:');
    files.map((file) => {
      console.log(`${file.name} (${file.id})`);
    });
  } else {
    console.log('No se encontraron archivos.');
  }
});



// ID del archivo que deseas leer

const fileId = '1MsKI22E5KlYJQUGOMmEKSFAOmaN9s2gp';

// Lee el contenido del archivo
drive.files.get({fileId: fileId, alt: 'media'}, {responseType: 'stream'}, (err, res) => {
  if (err) {
    console.log('Error al leer el archivo:', err);
    return;
  }


 

  // Convierte el contenido en una cadena de texto
  const chunks = [];
  res.data.on('data', (chunk) => {
    chunks.push(chunk);
  });
  res.data.on('end', () => {
    const content = Buffer.concat(chunks).toString('utf8');
    console.log('Contenido del archivo:', content);
    contenido=content;
    
  });
});




