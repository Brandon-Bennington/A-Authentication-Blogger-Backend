let express = require("express");
let router = express.Router();
const { uuid } = require("uuidv4");
const { db, User } = require("../mongo");
const {
  generatePasswordHash,
  validatePassword,
  generateUserToken,
  verifyToken,
} = require("../auth");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.post("/registration", async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    const saltRounds = 5;

    const passwordHash = await generatePasswordHash(password, saltRounds);
    const userType = email.endsWith("@admin.com") ? "admin" : "user";

    const newUser = new User({
      email: email,
      password: passwordHash,
      id: uuid(),
      userType: userType,
    });

    const insertResult = await newUser.save();

    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.toString() });
  }
});

router.post("/login", async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const user = await User.findOne({ email });

    if (!user) {
      res.json({ success: false, message: "Could not find user." }).status(204);
      return;
    }

    const isPWValid = await validatePassword(password, user.password);

    if (!isPWValid) {
      res
        .json({ success: false, message: "Password was incorrect." })
        .status(204);
      return;
    }

    const data = {
      date: new Date(),
      userId: user.id,
      scope: user.userType,
      email: email,
    };

    const token = generateUserToken(data);

    res.json({ success: true, token, email });
    return;
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.toString() });
  }
});

router.get("/message", (req, res) => {
  try {
    const tokenHeaderKey = process.env.TOKEN_HEADER_KEY;

    const token = req.header(tokenHeaderKey);

		console.log("token ", token)

		const verifiedTokenPayload = verifyToken(token)

    if (!verifiedTokenPayload) {
      return res.json({
        success: false,
        message: "ID Token could not be verified",
      });
    }

		console.log(verifiedTokenPayload)
    const userData = verifiedTokenPayload.userData;

    if (userData && userData.scope === "user") {
      return res.json({
        success: true,
        message: `I am a normal user with the email: ${userData.email}`,
      });
    }

		if (userData && userData.scope === "admin") {
      return res.json({
        success: true,
        message: `I am an admin user with the email ${userData.email}`,
      });
    }

    throw Error("Access Denied");
  } catch (error) {
    // Access Denied
    return res.status(401).json({ success: false, message: error });
  }

});

module.exports = router;

