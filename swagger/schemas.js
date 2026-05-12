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
 *          __v:
 *            type: integer
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
 *      Username:
 *        type: object
 *        required:
 *          - username
 *          - password
 *        properties:
 *          username:
 *            type: string
 *            example: username
 *          password:
 *            type: string
 *            format: password
 *            example: password
 *
 *      UserCredentials:
 *        type: object
 *        properties:
 *          username:
 *            type: string
 *            example: username
 *          password:
 *            type: string
 *            format: password
 *            example: password
 *
 *      UserUpdate:
 *        type: object
 *        required:
 *          - password
 *        properties:
 *          password:
 *            type: string
 *            format: password
 *            example: password
 *          newUsername:
 *            type: string
 *            example: username
 *          newPassword:
 *            type: string
 *            format: password
 *
 *      UserUpdated:
 *        type: object
 *        properties:
 *          message:
 *            type: string
 *          user:
 *            type: object
 *            properties:
 *              _id:
 *                type: string
 *              username:
 *                type: string
 *                example: username
 *              __v:
 *                type: integer
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
 *      Unauthorized:
 *        description: Invalid credentials
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
