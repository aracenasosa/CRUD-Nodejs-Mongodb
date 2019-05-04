const express = require('express');
const router = express.Router();
const Task = require('../models/task');

// Mostrar Info
router.get('/', async (req, res) => {
    const tasks = await Task.find();
    console.log(tasks);
    res.render('index', {tasks}); 
});

// Crear Registro
router.post('/add', async (req, res) => {
    const task = new Task(req.body);
    await task.save();
    res.redirect('/'); 
});

// Cambiar el status de true a false con el botton
router.get('/turn/:id', async (req, res) => {
    const { id } = req.params;
    const task = await Task.findById(id);
    task.status = !task.status;
    await task.save();
    res.redirect('/'); 
});

// Mostrar info en el formulario de edit
router.get('/edit/:id', async (req, res) => {
    const { id } = req.params;
    const task = await Task.findById(id);
    res.render('edit', {
        task
    });
});

//Editar registro
router.post('/edit/:id', async (req, res) => {
    const { id } = req.params;
    await Task.update({_id: id}, req.body);
    res.redirect('/');
});

// Borrar Registro
router.get('/delete/:id', async (req, res) => {
    const { id } = req.params;
    await Task.remove({_id: id});
    res.redirect('/'); 
});

module.exports = router;