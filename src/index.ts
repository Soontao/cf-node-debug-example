import express from "express";

if (module == require.main) {

    const app = express();
    const port = parseInt(process.env.PORT || "3000", 10);

    app.use(express.json());

    app.get("/", req => {
        req.res.json({
            "service": "cf-node-debug-example service"
        });
    });

    app.post("/add", req => {
        const { a, b } = req.body;
        if (a && b) {
            req.res.json({
                sum: a + b
            });
        } else {
            throw Error("Input format error");
        }
    });

    app.listen(port, () => { console.log(`app started at ${port}`); });

}
