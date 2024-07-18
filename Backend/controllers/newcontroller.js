import express from "express";
const app = express();
const port = 3000;
app.use(express.json());
app.post('/', (req, res) => {
    const { name } = req.body;

    res.send(`Welcome ${name}`);
});
app.listen(port, (error) => {
    console.log(error);
})