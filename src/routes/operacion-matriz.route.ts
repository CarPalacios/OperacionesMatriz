import * as Joi from 'joi';
import { Server } from "@hapi/hapi";
import * as operacionMatrizController from '../controllers/operacion-matriz.controller';
import { OperacionMatrizEntity } from '../entities/operacion-matriz.entity';


export const operacionMatrizRoutes = (server: Server) => {
  // Definicion de los routes
  server.route({
    method: 'POST',
    path: '/operacionMatriz',
    handler: operacionMatrizController.obtOperaciones
  });
  
};
