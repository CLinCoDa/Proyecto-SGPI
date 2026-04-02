import { describe, it, expect } from 'vitest';

describe('Prueba de integridad', () => {
  it('Debe confirmar que el entorno de pruebas funciona', () => {
    expect(1 + 1).toBe(2);
  });
});