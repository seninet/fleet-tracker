const User = require("./models/user");

const loadSampleUsers = async () => {
  const count = await User.countDocuments();
  if (count === 0) {
    await User.insertMany([
      { username: "admin", password: "admin123" },
      { username: "user", password: "user123" }
    ]);
    console.log("✅ Sample users loaded");
  } else {
    console.log("Users already exist");
  }
};

module.exports = loadSampleUsers;






// const User = require("./models/user");

// const loadSampleUsers = async () => {
//   const count = await User.countDocuments();
//   if (count === 0) {
//     await User.create({
//       name: "Test User",
//       email: "test@example.com",
//       password: "123456",
//     });
//     console.log("Sample user loaded");
//   }
// };

// module.exports = loadSampleUsers;



