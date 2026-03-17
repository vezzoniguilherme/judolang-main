export default async function handler(req, res) {
  const path = req.url.replace('/api/proxy', '');
  const url = `https://api.judokapro.com.br/api${path}`;
  
  const fetchOptions = {
    method: req.method,
    headers: {
      'Content-Type': 'application/json',
      'Cookie': req.headers.cookie || '',
    },
  };

  if (req.method !== 'GET' && req.method !== 'HEAD') {
    fetchOptions.body = JSON.stringify(req.body);
  }

  const response = await fetch(url, fetchOptions);
  const data = await response.text();
  
  response.headers.forEach((value, key) => {
    if (key.toLowerCase() !== 'transfer-encoding') {
      res.setHeader(key, value);
    }
  });
  
  res.status(response.status).send(data);
}