import Agent from '../models/agent.model.js';
import List from '../models/list.model.js';
import bcrypt from 'bcryptjs';

const createAgent = async (req, res) => {
  const { name, email, mobile, password } = req.body;
  const hash = bcrypt.hashSync(password, 10);

  const agent = await Agent.create({
    name,
    email,
    mobile,
    password: hash,
    admin: req.user.id  
  });

  res.status(201).json(agent);
};

const getAgents = async (req, res) => {
  try {
    const agents = await Agent.find({ admin: req.user.id });

    const agentsWithTasks = await Promise.all(
      agents.map(async (agent) => {
        const tasks = await List.find({ assignedTo: agent._id });
        return {
          ...agent.toObject(),
          tasks, // full task array, or just add taskCount: tasks.length if you want
        };
      })
    );

    res.json(agentsWithTasks);
  } catch (err) {
    console.error('Error fetching agents with tasks:', err);
    res.status(500).json({ message: 'Failed to fetch agents' });
  }
};

export {
  createAgent,
  getAgents
};
