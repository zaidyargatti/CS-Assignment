import Agent from '../models/agent.model.js';
import List from '../models/list.model.js';
import xlsx from 'xlsx';

export const uploadCSV = async (req, res) => {
  const file = req.file;
  if (!file) return res.status(400).json({ message: "No file" });

  const workbook = xlsx.read(req.file.buffer, { type: 'buffer' });
  const sheet = xlsx.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]]);

  const agents = await Agent.find({ admin: req.user.id }); // 👈 Only that admin's agents
  if (agents.length < 1) return res.status(400).json({ message: "No agents found" });

  let index = 0;
  const saved = [];

  for (const row of sheet) {
    const agent = agents[index % agents.length];
    const item = await List.create({
      firstName: row.FirstName,
      phone: row.Phone,
      notes: row.Notes,
      assignedTo: agent._id,
      sourceFileUrl: req.file.path,
      admin: req.user.id  // 👈 Link list to admin
    });
    saved.push(item);
    index++;
  }

  res.json(saved);
};

export const getAgentLists = async (req, res) => {
  const agentId = req.params.agentId;

  // Ensure the agent belongs to the logged-in admin
  const agent = await Agent.findOne({ _id: agentId, admin: req.user.id });
  if (!agent) return res.status(403).json({ message: "Access denied" });

  const lists = await List.find({ assignedTo: agentId, admin: req.user.id }); // 👈 Filter by admin
  res.json(lists);
};
