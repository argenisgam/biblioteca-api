const pool = require('../config/db');

exports.getAll = async() => {
    const resultado = await pool.query(
     'SELECT * FROM usuarios ORDER BY id'
    );
    return resultado[0];
};
exports.getById = async(id) => {
    const resultado = await pool.query(
     'SELECT * FROM usuarios WHERE id=?',
     [id]
    );
    return resultado[0][0];
};


exports.create = async (usuario)=>{
const resultado = await pool.query(
    `INSERT INTO usuarios(nombre,correo)
    VALUES(?,?)`,
    [usuario.nombre,usuario.correo]
    );
    return { id: resultado[0].insertId, ...usuario };
};

exports.update = async(id,usuario)=>{
    const resultado = await pool.query(
        `UPDATE usuarios
         SET nombre=?,
             correo=?
         WHERE id=?`,
        [
            usuario.nombre,
            usuario.correo,
            id
        ]
    );
    return resultado[0].affectedRows ? { id: Number(id), ...usuario } : null;
};

exports.delete = async(id)=>{
    const resultado=await pool.query(
        `DELETE FROM usuarios WHERE id=?`,
        [id]
    );
    return resultado[0].affectedRows ? { id: Number(id) } : null;
};
