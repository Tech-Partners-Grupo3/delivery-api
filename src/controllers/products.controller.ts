import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';

interface Product {
  codProducto: string;
  nombre: string;
  codCategoria: string;
  codRestau: string;
  urlImage: string;
  details: string;
  price: number;
  weight: number;
  promo: Date;
}

let DB: Product[] = [
  {
    codProducto: '1001',
    nombre: 'Pollo a la Brasa',
    codCategoria: 'CT-2001',
    codRestau: 'RT-3001',
    urlImage:
      'https://demoapidelivery.blob.core.windows.net/fotos/image002.png',
    details: '1 Pollo, papas,ensalada clasica familiar,salsas,gaseosa 1.5L',
    price: 65.5,
    weight: 1.2,
    promo: new Date(2022, 8, 22),
  },
  {
    codProducto: '1002',
    nombre: 'Lasagna Artesanal',
    codCategoria: 'CT-2004',
    codRestau: 'RT-3009',
    urlImage:
      'https://demoapidelivery.blob.core.windows.net/fotos/image001.png',
    details:
      'Con pasta fresca de huevo, salsa bolognesa y bechamel con queso edam y parmesano.',
    price: 28.5,
    weight: 0.6,
    promo: new Date(2022, 8, 30),
  },
];

@Controller('products')
export class ProductsController {
  @Get('/')
  getAllProducts() {
    return DB;
  }
  @Get('/:cod')
  getProductByCod(@Param('cod') cod: string) {
    return DB.filter((product) => product.codProducto == cod);
  }
  @Post('/')
  createNewProduct(@Body('data') data: Product) {
    if (data != undefined) {
      DB = [...DB, data];
      return {
        message: `Producto ${data.codProducto} Agregado`,
      };
    }
  }
  @Delete('/:cod')
  deleteProductByCod(@Param('cod') cod: string) {
    if (DB.some((product) => product.codProducto == cod)) {
      DB = DB.filter((product) => product.codProducto != cod);
      return {
        message: `Producto ${cod} Eliminado`,
      };
    }
  }
}
