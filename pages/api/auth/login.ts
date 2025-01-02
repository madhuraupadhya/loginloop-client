import { NextApiRequest, NextApiResponse } from 'next';

const loginHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    try {
      const response = await fetch('http://localhost:8000/auth/login', {  // Replace with your actual backend URL
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const error = await response.json();
        return res.status(response.status).json(error);
      }

      const data = await response.json();
      return res.status(200).json(data);  // Send the JWT token to the client
    } catch (error) {
      return res.status(500).json({ message: 'An error occurred' });
    }
  } else {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
};

export default loginHandler;
