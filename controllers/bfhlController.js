const { fibonacci, getPrimes, hcfArray, lcmArray } = require("../utils/mathUtils");
const { askAI } = require("../services/aiService");

exports.handleBFHL = async (req, res) => {
  try {
    const body = req.body;
    const keys = Object.keys(body);

    if (keys.length !== 1) {
      return res.status(400).json({
        is_success: false,
        error: "Exactly one key required"
      });
    }

    const key = keys[0];
    const value = body[key];
    let result;

    switch (key) {
      case "fibonacci":
        result = fibonacci(value);
        break;
      case "prime":
        result = getPrimes(value);
        break;
      case "hcf":
        result = hcfArray(value);
        break;
      case "lcm":
        result = lcmArray(value);
        break;
      case "AI":
        result = await askAI(value);
        break;
      default:
        return res.status(400).json({ is_success: false });
    }

    res.status(200).json({
      is_success: true,
      official_email: process.env.OFFICIAL_EMAIL,
      data: result
    });

  } catch (err) {
    res.status(500).json({
      is_success: false,
      error: err.message
    });
  }
};