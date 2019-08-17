const express = require("express");
const Projects = require("../data/helpers/projectModel");
const Actions = require("../data/helpers/actionModel");
const router = express.Router();



//GET gets all projects
router.get("/", (req, res) => {
    Projects.get()
    .then(projects => {
        res.json(projects);
    })
    .catch(({message})=> {
        res.status(500).json({
            message: "The Projects could not be retrieved",
            message
        });
    });
});

//GET gets project by ID
router.get("/:id", (req, res) => {
    const {id} = req.params;

    Projects.get(id)
    .then(project => {
        res.json(project);
    })
    .catch(({message}) => {
        res.status(500).json({
            message: "The project could not be retrieved",
            message
        });
    });
});

//POST create new project
router.post("/", (req, res) => {
    const newProject = req.body;

    Projects.insert(newProject)
    .then(projects=> {
        res.status(201).json(projects);
    })
    .catch(({message})=> {
        res.status(500).json({
            message: "Cannot create new project",
            message
        });
    });
});

//PUT update existing project
router.put("/:id", (req, res) => {
    const {id} = req.params;
    const updateProject = req.body;

    Projects.update(id, updateProject)
    .then(projects => {
        res.status(200).json(projects);
    })
    .catch(({message}) => {
        res.status(500).json({
            message: "Unable to update project",
            message
        })
    })

})

//DELETE delete project by ID
router.delete("/:id", (req, res) => {
    const {id} = req.params;

    Projects.remove(id)
    .then(projects => {
        res.json(projects);
    })
    .catch(({message}) => {
        res.status(500).json({
            message: "Unable to delete project",
            message
        });
    });
});

//GET project actions
router.get("/:id/actions", (req, res) => {
    const {id} = req.params;

    Projects.getProjectActions(id)
    .then(actions => {
        res.json(actions);
    })
    .catch(({message}) => {
        res.status(500).json({
            message: "The actions could not be retrieved",
            message
        });
    });
});

//POST create a new project action
router.post("/:id/actions", (req, res) => {
    const {id} = req.params;
    const {description, notes} = req.body;

    Actions.insert({description, notes, project_id: id})
    .then(action => {
        res.status(201).json(action);
    })
    .catch(({message}) => {
        res.status(500).json({
            message: "Could not add a new action",
            message
        })
    })
})

//PUT update a project action
router.put("/:id/actions/:id", (req, res)=> {
    const {id} = req.params;
    const changes = req.body;

    Actions.update(id, changes)
    .then
    .catch(({message})=> {
        message: "Could not update action",
        message
    })
})

//DELETE deletes a project action
router.delete("/:id/actions/:id", (req, res) => {
    const {id} = req.params;

    Actions.remove(id)
    .then
    .catch(({message}) => {
        message: "Could not delete action",
        message
    })
    
})

module.exports = router;