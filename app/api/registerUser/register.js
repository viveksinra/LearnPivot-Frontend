import User from "../../../models/user";
import dbConnect from "../../../config/dbConnect";

export default async function handler(req, res){
    if(req.method === "POST"){
        dbConnect();
        const {name, email, password} = req.body;
        const user = await User.create({name, email, password});
        req.status(201).json({user})
    }
}