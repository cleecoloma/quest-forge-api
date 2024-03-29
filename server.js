'use strict';
const dotenv = require('dotenv');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const axios = require('axios');

dotenv.config();
const PORT = process.env.PORT;
const API_KEY = process.env.API_KEY;

app.use(bodyParser.json());
app.use(cors());

app.put('/create', async (req, res) => {
  try {
    let responseData;

    if (req.body) {
      const requestBody = req.body;
      requestBody.id = 1;
      const response = await axios.put(
        'https://jb8ab1siq1.execute-api.us-west-2.amazonaws.com/initial/create/1',
        requestBody
      );
      responseData = response.data;
    }
    console.log("HERE'S THE RESPONSE DATA:", responseData);

    res.json(responseData);
  } catch (error) {
    console.error('Error processing the request:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.post('/quest', async (req, res) => {
  try {
    console.log("HERE'S THE REQUEST FROM FRONTEND:", req.body);
    let response;
    const config = {
      headers: {
        'x-api-key': API_KEY,
      },
    };

    if (req.body && Object.keys(req.body).length > 0) {
      const requestBody = req.body;
      response = await axios.post(
        'https://buig0o4co5.execute-api.us-west-2.amazonaws.com/initial/quest-start/1',
        requestBody,
        config
      );
    } else {
      response = await axios.post(
        'https://buig0o4co5.execute-api.us-west-2.amazonaws.com/initial/quest-start/1',
        {},
        config
      );
    }

    console.log("HERE'S THE RESPONSE:", response.data);
    res.json(response.data);
  } catch (error) {
    console.error('Error processing the request:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
