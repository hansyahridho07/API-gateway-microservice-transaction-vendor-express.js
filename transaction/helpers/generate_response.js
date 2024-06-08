module.exports = class DefaultResponse {
    success;
    statusCode;
    message;
    data;
    
    /**
     * 
     * @param {boolean} success 
     * @param {number} statusCode 
     * @param {string} message 
     * @param {any} data 
     */
    constructor(success=true, statusCode=200, message, data = null){
        this.success = success
        this.statusCode = statusCode
        this.message = message
        this.data = data
    }

    /**
     * @description response  http with statuscode ok (200) or created (201)
     * @returns {object{success:false, statusCode:number, message: string, data:null}}
     */
    getSuccessResponse(){
        return {
            success: this.success,
            statusCode: this.statusCode, //200 or 201
            message: this.message,
            data: this.data
        }
    }

    /**
     * @description response  http with statuscode Bad Request (400)
     * @returns {object{success:false, statusCode:400, message: string, data:null}}
     */
    getBadRequestResponse(){
        return {
            success: false,
            statusCode: 400,
            message: this.message,
            data: null
        }
    }

    /**
     * @description response  http with statuscode Unauthorized (401) 
     * @returns {object{success:false, statusCode:401, message: string, data:null}}
     */
    getUnauthorizedResponse(){
        return {
            success: false,
            statusCode: 401,
            message: this.message,
            data: null
        }
    }

    /**
     * @description response  http with statuscode Forbidden (403) 
     * @returns {object{success:false, statusCode:403, message: string, data:null}}
     */
    getForbiddenResponse(){
        return {
            success: false,
            statusCode: 403,
            message: this.message,
            data: null
        }
    }

    /**
     * @description response  http with statuscode Not Found (404) 
     * @returns {object{success:false, statusCode:403, message: string, data:null}}
     */
    getNotFoundResponse(){
        return {
            success: false,
            statusCode: 404,
            message: this.message,
            data: null
        }
    }

    /**
     * @description response  http with statuscode Internal Server Error (500) 
     * @returns {object{success:false, statusCode:500, message: string, data:null}}
     */
    getInternalServerErrorResponse(){
        return {
            success: false,
            statusCode: 500,
            message: this.message,
            data: null
        }
    }
}