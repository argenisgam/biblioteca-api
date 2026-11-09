const Usuario=require('../models/Usuarios');


exports.getAll = async ()=>{
    return await Usuario.findAll();
};
exports.getById = async (id)=>{
    return await Usuario.findByPk(id);
};

exports.create = async(usuario)=>{
return await Usuario.create(usuario);
};


exports.update = async (id, dataUsuario) => {
    const usuario=await Usuario.findByPk(id);
    if(!usuario){
        return null;
    }
    usuario.nombre=dataUsuario.nombre;
    usuario.correo=dataUsuario.correo;
    await usuario.save();
    return usuario;
};

exports.delete = async (id) => {
    const usuario=await Usuario.findByPk(id);
    if(!usuario){
        return null;
    }
    usuario.destroy();
    return usuario;
};
