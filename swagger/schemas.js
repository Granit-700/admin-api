/**
 * @swagger
 *  components:
 *    schemas:
 *
 *      Tour:
 *        allOf:
 *          - $ref: "#/components/schemas/TourContent"
 *          - type: object
 *            properties:
 *              image:
 *                $ref: "#/components/schemas/ImageObject"
 *              itinerary:
 *                type: array
 *                items:
 *                  type: object
 *                  properties:
 *                    _id:
 *                      type: string
 *                    day:
 *                      type: number
 *                    title:
 *                      type: string
 *                    text:
 *                      type: string
 *                    accommodation:
 *                      type: string
 *                    meals:
 *                      type: string
 *                    image:
 *                      $ref: "#/components/schemas/ImageObject"
 *              _id:
 *                type: string
 *              createdAt:
 *                type: string
 *                format: date-time
 *              updatedAt:
 *                type: string
 *                format: date-time
 *              __v:
 *                type: integer
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
 *            format: binary
 *          itineraryImages:
 *            type: array
 *            items:
 *              type: string
 *              format: binary
 *          itinerary:
 *            type: string
 *            description: JSON-строка массива дней. Порядок изборажений важен!
 *            example: '[{"day":1,"title":"День 1","text":"...","accommodation":"отель","meals":"завтрак"}]'
 *
 *      Blog:
 *        allOf:
 *          - $ref: "#/components/schemas/BlogContent"
 *          - type: object
 *            properties:
 *              image:
 *                $ref: "#/components/schemas/ImageObject"
 *              _id:
 *                type: string
 *              createdAt:
 *                type: string
 *                format: date-time
 *              updatedAt:
 *                type: string
 *                format: date-time
 *              __v:
 *                type: integer
 *
 *      BlogContent:
 *        type: object
 *        properties:
 *          title:
 *            type: string
 *          content:
 *            type: string
 *          excerpt:
 *            type: string
 *          slug:
 *            type: string
 *          author:
 *            type: string
 *          status:
 *            type: string
 *          categories:
 *            type: array
 *            items:
 *              type: string
 *          tags:
 *            type: array
 *            items:
 *              type: string
 *          image:
 *            $ref: "#/components/schemas/ImageObject"
 *
 *      ImageObject:
 *        type: object
 *        properties:
 *          url:
 *            type: string
 *            format: uri
 *          public_id:
 *            type: string
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
