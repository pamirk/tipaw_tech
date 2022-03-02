// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  let user = req.body.values
  //generate token send
  res.status(200).json({ token: '123' })
//  if error occurred
//  res.status(200).json({ error: '123', message: "error msg" })
}
