import BaseClass from "../util/baseClass";
import DataStore from "../util/DataStore";
import CommentClient from "../api/commentClient";

class CommentPage extends BaseClass {

    constructor() {
        super();
        this.bindClassMethods(['onGet', 'onCreate', 'renderExample'], this);
        this.dataStore = new DataStore();
    }

    /**
     * Once the page has loaded, set up the event handlers
     */
    async mount() {
        document.getElementById('create-comment-form').addEventListener('submit', this.onCreate);
        this.client = new CommentClient();

        this.dataStore.addChangeListener(this.renderExample)
    }

    /** Render Methods -----------------------------------------------------------------------------------------------*/

    async renderExample() {
        let resultArea = document.getElementById("result-info");

        const example = this.dataStore.get("example");

        if (example) {
            resultArea.innerHTML = `
                <div>ID: ${example.id}</div>
                <div>Name: ${example.name}</div>
            `
        } else {
            resultArea.innerHTML = "No Item";
        }
    }

    /** Event Handlers -----------------------------------------------------------------------------------------------*/

    async onGet(event) {
        // Prevent the page from refreshing on form submit
        event.preventDefault();

        let id = document.getElementById("id-field").value;
        this.dataStore.set("example", null);

        let result = await this.client.getExample(id, this.errorHandler);
        this.dataStore.set("example", result);
        if (result) {
            this.showMessage(`Got ${result.name}!`)
        } else {
            this.errorHandler("Error doing GET!  Try again...");
        }
    }

    async onCreate(event) {
        // Prevent the page from refreshing on form submit
        event.preventDefault();

        let owner = document.getElementById("create-comment-owner").value;
        let title = document.getElementById("create-comment-title").value;
        let content = document.getElementById("create-comment-content").value;

        const createdExample = await this.client.createComment(owner, title, content, this.errorHandler);

        if (createdExample) {
            this.showMessage(`Posted a comment!`)
        } else {
            this.errorHandler("Error creating!  Try again...");
        }
    }
}

/**
 * Main method to run when the page contents have loaded.
 */
const main = async () => {
    const commentPage = new CommentPage();
    commentPage.mount();
};

window.addEventListener('DOMContentLoaded', main);
