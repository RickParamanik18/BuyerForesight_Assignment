const express = require("express");
const mainRouter = require("./routers/index.router");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use("/api", mainRouter);

app.get("/", (req, res) => {
    res.send("Hello, World!");
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
