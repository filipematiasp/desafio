/**
 * @swagger
 * /:
 *  get:
 *      summary: Retorna um hello world
 *  responses:
 *      200:
 *          description: Hello Asksuite World!
 *
 * /search:
 *   post:
 *     summary: Busca acomodações para as datas informadas
 *     description: Retorna os dados extraídos pelo BrowserService com base no checkin e checkout enviados no corpo da requisição.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - checkin
 *               - checkout
 *             properties:
 *               checkin:
 *                 type: string
 *                 format: date
 *                 example: "2025-07-05"
 *               checkout:
 *                 type: string
 *                 format: date
 *                 example: "2025-07-07"
 *     responses:
 *       200:
 *         description: Resultado da busca de acomodações
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                     example: "Quarto Luxo"
 *                   description:
 *                     type: string
 *                     example: "Quarto com vista para o mar"
 *                   price:
 *                     type: string
 *                     example: "R$ 250,00"
 *                   photoUrl:
 *                     type: string
 *                     example: "https://exemplo.com/foto.jpg"
 *       400:
 *         description: Datas inválidas ou não informadas
 *       500:
 *         description: Erro interno do servidor
 */
