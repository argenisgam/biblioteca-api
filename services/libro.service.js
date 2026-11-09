const Libro=require('../models/Libro');


exports.getAll=async()=>{
    return await Libro.findAll();
}
exports.getById=async(id)=>{
    return await Libro.findByPk(id);
}

exports.create=async(libro)=>{
    return await Libro.create(libro);
}

exports.update=async(id,datoLibro)=>{
   const libro=await Libro.findByPk(id);
   if(!libro){
    return null;
   }
   libro.titulo=datoLibro.titulo;
   libro.autor=datoLibro.autor;
   libro.anio=datoLibro.anio;
   await libro.save();
   return libro;

}
exports.delete=async(id)=>{
    const libro=await Libro.findByPk(id);
    if(!libro){
        return null;
    }
    await libro.destroy();
    return libro;
}
