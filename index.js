const Datastore = require('@google-cloud/datastore');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

const datastore = new Datastore({});

const kind = 'Contact';

app.get('/', (req, res) => {
  const query = datastore.createQuery('Contact');

  datastore.runQuery(query).then(results => {
    const contacts = results[0];
    res.json(contacts);
  });
});
app.post('/', (req, res) => {
  const body = req.body;
  const contact = {
    key: datastore.key([kind, body.email]),
    data: body,
  };
  datastore
    .save(contact)
    .then(() => {
      res.send('Created contact')
    })
    .catch(err => {
      console.error('ERROR:', err);
    });
});

app.listen(3000, () => console.log('Datastore app listening on port 3000!'));
