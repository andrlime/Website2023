import type { NextApiRequest, NextApiResponse } from 'next';
import 'dotenv/config';
import Airtable from 'airtable';

type Project = {
    title: string;
    coverImageUrl: string;
    description: string;
    link?: string;
}

export default function coding(
  _req: NextApiRequest,
  res: NextApiResponse<Array<Project>>
): void  {
    
    Airtable.configure({
        endpointUrl: 'https://api.airtable.com',
        apiKey: process.env.AIRTABLE_KEY
    });
    const base = Airtable.base(process.env.AIRTABLE_BASE || "");
    const arr: Array<Project> = [];

    base('coding').select({
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
}