import emailModel from "../models/emailModel.js";

const receiveEmail = async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !message || !email) {
    return res.status(400).json({ message: "All fields are required!" });
  }

  try {
    const emails = new emailModel({ name, email, message });
    await emails.save();
    res.status(201).json({ message: "Email received successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to save email", error });
  }
};

const fetchEmails = async (req, res) => {
  try {
    const emails = await emailModel.find().sort({ receivedAt: -1 });
    res.status(200).json(emails);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch emails", error });
  }
};

const message = async (req, res) => {
  try {
    const email = await emailModel.findById(req.params.id);
    if (email) {
      res.json(email);
    } else {
      res.status(404).send("Email not found");
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export { fetchEmails, receiveEmail, message };
