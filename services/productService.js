const { faker } = require('@faker-js/faker');
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
class ProductsServices{
constructor(){
  // this.generate()
}
//categorias
 async  generate(){
  const  size = 3 ;
  for (let i = 0; i < size; i++) {
     await prisma.categoria.create({
      data:{
        name: faker.commerce.department(),
        image: faker.image.imageUrl(),
    }
  });
  }
   this.generate1();
}
//subcategorias
  async generate1(){
  const categorias = await prisma.categoria.findMany()
  const  size = 3 ;
    for (let i = 0; i < size; i++) {
      categorias.map(async element => {
      await prisma.subCategoria.create({
        data:{
          name: faker.commerce.productName(),
          image: faker.image.imageUrl(),
          size: true,
          categoriaId:parseInt(element.id)
        }
      });
    });
    }
    setTimeout(()=>this.generate2(),2000)
}

//produtos
async generate2(){
  const  size = 4 ;
  const subCategorias = await prisma.subCategoria.findMany()
  subCategorias.map(async element => {
     for (let i = 0; i < size; i++) {
        await prisma.producto.create({
          data:{
            name: faker.commerce.productName(),
            descripcion:faker.commerce.productDescription(),
            price: parseFloat(faker.commerce.price(100)),
            stock:parseInt(2),
            status:true,
            image: faker.image.business(),
            subCategoriaId:parseInt(element.id)
          }
        });
      }
  });
}
//en create se tien que hacer validaciones con try catch y ver si la subactegoria existe
create(body){
  const {name,descripcion,price,stock,image,subCategoriaId} = body;
   const newProduct =  prisma.producto.create({
    data:{
      name, price, descripcion, stock, status:true, image, subCategoriaId
    }
   })
 return newProduct;
}

 find(){
  const products =  prisma.producto.findMany()

  return products;
}

 findOne(id){
  const productId =  prisma.producto.findFirst({
    where: { id: parseInt(id) }
  })
  return productId;
}

update(id,data){
  const {name,descripcion,price,stock,status,image,subCategoriaId } = data;
  const product = prisma.producto.update({
    where: { id: parseInt(id) },
    data: {
          name: name,
          descripcion:descripcion,
          price: price,
          stock: stock,
          status:status,
          image: image,
          subCategoriaId:subCategoriaId
          },
  })
  return product;
}

delete(id){
const delet = this.update(id,{status:false})
return delet;
}
}

module.exports = ProductsServices;
