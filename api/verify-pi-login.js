import axios from "axios";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res
      .status(405)
      .json({ success: false, error: "Method not allowed" });
  }

  const { accessToken } = req.body;

  if (!accessToken) {
    return res
      .status(400)
      .json({ success: false, error: "Missing access token" });
  }

  try {
    // Call Pi API to verify the token
    const response = await axios.get("https://api.minepi.com/v2/me", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "X-API-Key": process.env.PI_API_KEY, // 👈 must be set in Vercel
      },
    });

    const piUser = response.data; // e.g. { uid, username }

    // Send back only what frontend needs
    return res.status(200).json({
      success: true,
      username: piUser.username,
      uid: piUser.uid,
    });
  } catch (error) {
    console.error("PI verification error:", error.response?.data || error.message);

    return res.status(401).json({
      success: false,
      error: error.response?.data || error.message,
    });
  }
}