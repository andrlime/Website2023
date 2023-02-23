import express, { Request, Response } from "express";
import dotenv from "dotenv";
import Airtable from 'airtable';
dotenv.config();

type Project = {
    title: string;
    coverImageUrl: string;
    description: string;
    link?: string;
}

const router = express.Router();

router.route("/projects").get((req: Request, res: Response) => {
  Airtable.configure({
    endpointUrl: 'https://api.airtable.com',
    apiKey: process.env.API_KEY
  });
  const base = Airtable.base(process.env.BASE_KEY || "");
  const arr: Array<Project> = [];

  base('projects').select({
      maxRecords: 100,
      view: "Grid view"
  }).eachPage(function page(records: any, fetchNextPage: any) {
      records.forEach(function (record: any) {
          arr.push(record.fields);
      });
      fetchNextPage();
  }, function done() {
      res.status(200).json(arr);
  });
});

router.route("/nuft/fakedata").get((req: Request, res: Response) => {
    const FAKE_DATA: Array<{'timestamp': number, 'cpu_percent': number}> = [];

    for(let i = 0; i < 24; i ++) {
        FAKE_DATA.push({'timestamp': 1677123854 + (Math.random() * 1000 - 500), 'cpu_percent': 5 + (Math.random()*8)-4});
    }

    res.status(200).json(FAKE_DATA);
});

module.exports = router;
export default router;