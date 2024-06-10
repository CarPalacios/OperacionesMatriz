import { Context } from "../middleware/context";
import axios from "axios";
import { logger } from '../utils/logger';

// Implementacion de funciones

export const obtOperaciones = async (matrizRequest: number[][]) => {
  // Lógica
  try {
    logger.info(`Request => ${matrizRequest}`);
    const response = await axios.post("http://localhost:3000/rotate", matrizRequest);
    const matriz = response.data;

    if (!Array.isArray(matriz) || !matriz.length || !Array.isArray(matriz[0])) {
      throw new Error("La respuesta no es una matriz válida");
    }

    let max = -Infinity;
    let min = Infinity;
    let sum = 0;
    let isDiagonal = true;
    const n = matriz.length;

    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        const value = matriz[i][j];
        sum += value;
        if (value > max) max = value;
        if (value < min) min = value;
        if (i !== j && value !== 0) isDiagonal = false;
      }
    }

    const average = sum / (n * n);

    return { max, min, average, sum, isDiagonal };
  } catch (error) {
    console.error("Error en obtener las operaciones: ", error);
    throw error;
  }
};
