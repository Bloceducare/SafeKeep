
export default function handler(req, res) {
    if (req.method === 'POST') {
      // Process a POST request - Example:
      res.status(200).json({name: "John Doe" })
    } else {
      // Handle any other HTTP method
      res.status(200).json({name: "John Doe Get" })
    }
  }