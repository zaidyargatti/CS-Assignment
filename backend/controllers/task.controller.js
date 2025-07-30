import List from "../models/list.model.js";

const getAllTasksWithAgents = async (req, res) => {
  try {
    const adminId = req.user._id;

    const tasks = await List.find({ admin: adminId })
      .populate('assignedTo', 'name email mobile')
      .sort({ createdAt: -1 });

    res.status(200).json(tasks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching tasks', error: err.message });
  }
};

const getTaskByAgent = async (req, res) => {
  try {
    const tasks = await List.find({ assignedTo: req.params.agentId });
    res.json({tasks});
  } catch (err) {
    res.status(500).json({ message: 'Error fetching tasks' });
  }
};

export { 
  getAllTasksWithAgents,
  getTaskByAgent
};
