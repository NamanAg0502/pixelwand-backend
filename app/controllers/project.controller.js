import Project from '../models/project.model.js';

// Controller to create a new project
export async function createProject(req, res) {
  try {
    const { name, description, startDate } = req.body;
    const project = new Project({ name, description, startDate });
    await project.save();
    res.status(201).json(project);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create the project' });
  }
}

// Controller to get a list of all projects
export async function getProjects(req, res) {
  try {
    const projects = await Project.find();
    res.status(200).json(projects);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
}

// Controller to get details of a specific project by ID
export async function getProjectById(req, res) {
  try {
    const projectId = req.params.id;
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
    res.status(200).json(project);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch project details' });
  }
}

// Controller to update project details by ID
export async function updateProject(req, res) {
  try {
    const projectId = req.params.id;
    const updates = req.body;
    const updatedProject = await Project.findByIdAndUpdate(projectId, updates, {
      new: true,
    });
    if (!updatedProject) {
      return res.status(404).json({ error: 'Project not found' });
    }
    res.status(200).json(updatedProject);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update project' });
  }
}

// Controller to delete a project by ID
export async function deleteProject(req, res) {
  try {
    const projectId = req.params.id;
    const deletedProject = await Project.findByIdAndRemove(projectId);
    if (!deletedProject) {
      return res.status(404).json({ error: 'Project not found' });
    }
    res.status(204).send(); // No content on successful deletion
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete project' });
  }
}
