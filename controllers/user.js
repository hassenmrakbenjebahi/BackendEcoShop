import User from '../models/user.js'

export async function addUser (req, res){
    try {
      const user = new User(req.body)
      const savedUser = await user.save()
      res.status(201).json(savedUser);
    } catch (error) {
      res.status(400).json({ error: 'Error signUp' })
    }
};