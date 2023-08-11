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

router.route("/gd").get((req: Request, res: Response) => {
    Airtable.configure({
      endpointUrl: 'https://api.airtable.com',
      apiKey: process.env.API_KEY
    });
    const base = Airtable.base(process.env.BASE_KEY || "");
    const arr: Array<Project> = [];
  
    base('gd').select({
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

router.route("/gizmos").get((req: Request, res: Response) => {
    Airtable.configure({
      endpointUrl: 'https://api.airtable.com',
      apiKey: process.env.API_KEY
    });
    const base = Airtable.base(process.env.BASE_KEY || "");
    const arr: Array<Project> = [];
  
    base('gizmos').select({
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

module.exports = router;
export default router;
