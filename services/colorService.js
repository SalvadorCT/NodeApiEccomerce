const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

class ColorService {
  constructor() {}

  create(body) {
    const {name} = body;
    const newColor = prisma.color.create({
      data: {
        name,
      },
    });
    return newColor;
  }
  update(id, data) {
    const { name } = data;
    const colores = prisma.color.update({
      data: {
        name,
      },
    });
    return colores;
  }
  delete(id) {
    const delet = this.update(id);
    return delet;
  }
}
module.exports = ColorService;
