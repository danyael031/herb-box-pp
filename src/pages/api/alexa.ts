import { NextApiRequest, NextApiResponse } from "next";
import { PlantitaSkill } from "../../skill";
//import { SkillRequestSignatureVerifier, TimestampVerifier } from 'ask-sdk-express-adapter';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    //const rawBody = await req;
    //const headers: Record<string, string> = {
    //  'signature': req.headers.get('signature') || '',
    //  'signaturecertchainurl': req.headers.get('signaturecertchainurl') || '',
    //} ;

    //await new SkillRequestSignatureVerifier().verify(rawBody, req.headers);
    //await new TimestampVerifier().verify(rawBody);

    const response = await PlantitaSkill.invoke(req.body);

    res.status(200).json(response);
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }

}
