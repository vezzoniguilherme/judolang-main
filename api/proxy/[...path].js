export default async function handler(req, res) {
  const path = req.url.replace('/api/proxy', '');
  const url = `https://judokapro-backend.onrender.com/api${path}`;
  
  const response = await fetch(url, {
    method: req.method,
    headers: {
      'Content-Type': 'application/json',
      'Cookie': req.headers.cookie || '',
    },
    body: req.method !== 'GET' ? JSON.stringify(req.body) : undefined,
  });

  const data = await response.text();
  
  response.headers.forEach((value, key) => {
    res.setHeader(key, value);
  });
  
  res.status(response.status).send(data);
} 
