import BaseClass from "../util/baseClass";
import axios from 'axios'

/**
 * Client to call the ExampleService.
 */
export default class CommentClient extends BaseClass {

    constructor(props = {}){
        super();
        const methodsToBind = ['clientLoaded', 'getComment', 'createComment', 'getAllComments'];
        this.bindClassMethods(methodsToBind, this);
        this.props = props;
        this.clientLoaded(axios);
    }

    /**
     * Run any functions that are supposed to be called once the client has loaded successfully.
     * @param client The client that has been successfully loaded.
     */
    clientLoaded(client) {
        this.client = client;
        if (this.props.hasOwnProperty("onReady")){
            this.props.onReady();
        }
    }

    async getComment(id, errorCallback) {
        try {
            const response = await this.client.get(`/comment/${id}`);
            return response.data;
        } catch (error) {
            this.handleError("getConcert", error, errorCallback)
        }
    }

    async createComment(owner, title, content, errorCallback) {
        try {
            const response = await this.client.post(`/comment`, {
                "owner": owner,
                "title": title,
                "content": content,
            });
            return response.data;
        } catch (error) {
            this.handleError("createComment", error, errorCallback);
        }
    }

    async getAllComments(errorCallback) {
        try {
            const response = await this.client.get(`/comment/all`);
            return response.data;
        } catch (error) {
            this.handleError("getConcert", error, errorCallback)
        }

    }

    /**
     * Helper method to log the error and run any error functions.
     * @param error The error received from the server.
     * @param errorCallback (Optional) A function to execute if the call fails.
     */
    handleError(method, error, errorCallback) {
        console.error(method + " failed - " + error);
        if (error.response.data.message !== undefined) {
            console.error(error.response.data.message);
        }
        if (errorCallback) {
            errorCallback(method + " failed - " + error);
        }
    }
}
