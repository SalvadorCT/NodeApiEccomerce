const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

class TamanoService{
  constructor(){}

  create(body){
    const {name,productoId}=body;
    const newTamano = prisma.tamano.create({
      data:{
        name,
        productoId,
      },
    });
    return newTamano;
  }
  update(id,data){
    const { name, productoId } = data;
    const tamanos = prisma.tamano.update({
      data: {
        name,
        productoId,
      },
    });
    return tamanos;
  }
  delete(id){
    const delet=this.update(id);
    return delet;
  }
}
module.exports = TamanoService;
