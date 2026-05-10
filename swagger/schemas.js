/**
 * @swagger
 *  components:
 *    schemas:
 *
 *      Tour:
 *        type: object
 *        properties:
 *          _id:
 *            type: string
 *          title:
 *            type: string
 *          date:
 *            type: string
 *            format: date-time
 *          description:
 *            type: string
 *          location:
 *            type: string
 *          price:
 *            type: number
 *          image:
 *            type: string
 *            format: uri
 *          createdAt:
 *            type: string
 *            format: date-time
 *          updatedAt:
 *            type: string
 *            format: date-time
 *
 *      TourContent:
 *        type: object
 *        properties:
 *          title:
 *            type: string
 *          date:
 *            type: string
 *            format: date-time
 *          description:
 *            type: string
 *          location:
 *            type: string
 *          price:
 *            type: number
 *          image:
 *            type: string
 *            format: uri
 *
 *      ErrorMessage:
 *        required:
 *          - message
 *        type: object
 *        properties:
 *          message:
 *            type: string
 *
 *
 *    responses:
 *
 *      BadReq:
 *        description: Bad Request
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/ErrorMessage"
 *
 *      NotFound:
 *        description: Not Found
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/ErrorMessage"
 *
 *      ServerError:
 *        description: Server error
 */
