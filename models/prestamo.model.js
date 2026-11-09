const pool=require('../config/db');
exports.getAll=async()=>{
    const resultado= await pool.query(
        `SELECT P.ID,
            P.fecha_prestamo, 
            P.FECHA_DEVOLUCION,
            U.NOMBRE as usuario,
            L.TITULO as libro
            FROM PRESTAMOS P
            INNER JOIN USUARIOS U
            ON P.USUARIO_ID=U.ID
            INNER JOIN LIBROS L
            ON P.LIBRO_ID=L.ID
        `
    );
    return resultado[0];
}
exports.getById=async(id)=>{
    const resultado= await pool.query(
        `SELECT P.ID,
            P.fecha_prestamo, 
            P.FECHA_DEVOLUCION,
            U.NOMBRE as usuario,
            L.TITULO as libro
            FROM PRESTAMOS P
            INNER JOIN USUARIOS U
            ON P.USUARIO_ID=U.ID
            INNER JOIN LIBROS L
            ON P.LIBRO_ID=L.ID
            WHERE P.ID=?
        `,
        [id]
    );
    return resultado[0][0];
}

exports.libroPrestado = async(idLibro)=>{
    const resultado = await pool.query(
        `SELECT *
        FROM prestamos
        WHERE libro_id=?
        AND fecha_devolucion IS NULL`,
        [idLibro]
    );
    return resultado[0].length > 0;
};

exports.create = async (prestamo)=>{
const resultado = await pool.query(
    `INSERT INTO prestamos(usuario_id,libro_id,fecha_prestamo)
    VALUES(?,?,CURRENT_DATE)`,
    [prestamo.usuario_id,prestamo.libro_id]
    );
    return { id: resultado[0].insertId, ...prestamo };
};

exports.devolver=async(id)=>{
    const resultado=await pool.query(
        `UPDATE prestamos
        SET fecha_devolucion=CURRENT_DATE
        WHERE id=?`,
        [id]
    );
return resultado[0].affectedRows ? { id: Number(id) } : null;
};
