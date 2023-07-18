import app from "./app.js";

const PORT = process.env.PORT || 1000;
app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`);
});
