import express, { Router } from "express";
import data from "../mockData/stackoverfaux.json";

const router: Router = express.Router();

router.get("/posts", (req, res) => {
  setTimeout(() => {
    res.send(data);
  }, 1000);
});

export default router;
