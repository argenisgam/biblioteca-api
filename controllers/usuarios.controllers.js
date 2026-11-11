const usuarioService = require('../services/usuarios.services');

exports.getAll = async(req,res)=>{
    const usuarios = await usuarioService.getAll();
    res.json(usuarios);
};

exports.getById = async(req,res)=>{
    const usuario = await usuarioService.getById(req.params.id);
    res.json(usuario);
};

exports.create = async(req,res,next)=>{
    try{
        const usuario = await usuarioService.create(req.body);
        res.status(201).json(usuario);
    }catch(error){
        next(error);
    }
};


exports.update = async (req, res) => {
    try {

        const id = req.params.id;
        const usuario = req.body;
        const usuarioActualizado = await usuarioService.update(id, usuario);

        if (!usuarioActualizado) {
            return res.status(404).json({
                mensaje: "Usuario no encontrado"
            });
        }

        res.status(200).json(usuarioActualizado);

    } catch (error) {
        res.status(500).json({
            mensaje: error.message
        });
    }
};

exports.delete = async (req, res,next) => {
    try {
        const usuario = await usuarioService.delete(req.params.id);
        if (!usuario) {
            return res.status(404).json({
                mensaje: "Usuario no encontrado"
            });
        }
        res.status(200).json(usuario);
    } catch (error) {
        next(error);
    }
};