import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if(req.method === 'POST'){
    let request = req.body;
    console.log(request)


    res.status(200).json({request})
  }

}
