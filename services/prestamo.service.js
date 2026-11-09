const {Usuario,Prestamo,Libro}=require('../models');
const BusinessError = require('../errors/BusinessError');
const SystemError = require('../errors/SystemError');
exports.getAll=async()=>{
    return await Prestamo.findAll({
        include:[
        {   model:Usuario,
            attributes:[
            "nombre","correo"
            ]
        },
        {
            model:Libro,
            attributes:["titulo"
            ]
        }
        
        ]
    }); 
}
exports.getById=async(id)=>{
    return await Prestamo.findByPk(id,{
        include:[
        {   model:Usuario,
            attributes:[
            "nombre","correo"
            ]
        },
        {
            model:Libro,
            attributes:["titulo","autor"
            ]
        }
        
        ]
    }); 
}
exports.create=async(prestamo)=>{
    const usuario=await Usuario.findByPk(prestamo.usuario_id);
    if(!usuario){
        throw new BusinessError("El usuario no existe");
    }
    const libro =await Libro.findByPk(prestamo.libro_id);
    if(!libro){
          throw new BusinessError("El libro no existe");
      
    }

    if(await libroPrestado(prestamo.libro_id)){
         throw new BusinessError("El libro estÃ¡ prestado");

    }
    return await Prestamo.create(prestamo); 
}

exports.devolucion= async(id)=>{
    const prestamo=await Prestamo.findByPk(id);
    if(!prestamo){
        throw new Error("El prÃ©stamo no existe");
    }
    if(prestamo.fecha_devolucion){
        throw new Error("El prÃ©stamo ya fue devuelto");
    }
    return await devolver(prestamo);

}

async function libroPrestado(idLibro){
    const prestamo = await Prestamo.findOne({
        where: { libro_id: idLibro, fecha_devolucion: null }
    });
    return prestamo !== null;
}

async function devolver(prestamo){
    prestamo.fecha_devolucion = new Date();
    await prestamo.save();
    return prestamo;
}
