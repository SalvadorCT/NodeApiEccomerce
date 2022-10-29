const {PrismaClient} = require('@prisma/client');

const prisma = new PrismaClient();

class DireccionServices{
  constructor(){}

  create(body){
    const {calle,numero,referencia,departamentoId,ciudadId,distritoId,usuarioId}=body;
    const newDireccion = prisma.direccion.create({
      data: {
        calle,
        numero,
        referencia,
        departamentoId,
        ciudadId,
        distritoId,
        usuarioId,
      },
    });
    return newDireccion;
  }
  find(){
    const direcciones = prisma.direccion.findMany();
    return direcciones;
  }
  findOne(id){
    const direccionId = prisma.direccion.findFirst({
      where: { id: parseInt(id) },
    });
    return direccionId;
  }
  update(id,data){
    const {calle,numero,referencia,departamentoId,ciudadId,distritoId,usuarioId}=data;
    const direcciones = prisma.direccion.update({
      where: { id: parseInt(id) },
      data: {
        calle,
        numero,
        referencia,
        departamentoId,
        ciudadId,
        distritoId,
        usuarioId,
      },
    });
    return direcciones;
  }
  delete(id){
    const delet = this.update(id);
    return delet;
  }
}

module.exports = DireccionServices;
