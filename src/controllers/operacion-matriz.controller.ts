import { Request, ResponseToolkit } from '@hapi/hapi';
import * as Boom from '@hapi/boom';
import * as operacionMatrizService from '../services/operacion-matriz.service';
import { OperacionMatrizEntity } from '../entities/operacion-matriz.entity';
import { Context, ContextRequestApplicationState } from '../middleware/context';


// Definición de las funciones controller

export const obtOperaciones = async (request: Request, h: ResponseToolkit) => {
    try {
        const payload = request.payload as any;
        const matrizRequest: number[][] = payload;
        const operacionMatriz = await operacionMatrizService.obtOperaciones(matrizRequest);
        return h.response(operacionMatriz).code(200);
    } catch(error: any) {
        const e = Boom.internal("Error al obtener las operaciones de la matriz");
        e.output.payload.message = 'Error al obtener las operaciones de la matriz';
        return e;
    }
}
