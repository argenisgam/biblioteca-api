const pool=require('../config/db');
exports.getAll=async()=>{
    const resultado=await pool.query(
        'SELECT * FROM libros ORDER BY id'
    );
    return resultado[0];
};
exports.getById=async(id)=>{
    const resultado=await pool.query(
        'SELECT * FROM libros WHERE id=?',
        [id]   
    );
    return resultado[0][0];
};
exports.create=async(libro)=>{
    const resultado=await pool.query(
        `INSERT INTO libros 
        (titulo,autor,anio)
        VALUES(?,?,?)`,
        [libro.titulo,libro.autor,libro.anio]        
    );
    return { id: resultado[0].insertId, ...libro };
};

exports.update=async(id,libro)=>{
   const resultado=await pool.query(
        `UPDATE libros
         SET titulo=?,
         autor=?,
         ANIO=?
         WHERE id=?`,
        [libro.titulo,libro.autor,libro.anio, id]        
    ); 
        return resultado[0].affectedRows ? { id: Number(id), ...libro } : null;

};
exports.delete=async(id)=>{
    const resultado=await pool.query(
        `DELETE FROM libros WHERE id=?`,
        [id]
    );
    return resultado[0].affectedRows ? { id: Number(id) } : null;
};
