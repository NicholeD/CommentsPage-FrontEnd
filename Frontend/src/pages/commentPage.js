import BaseClass from "../util/baseClass";
import DataStore from "../util/DataStore";
import CommentClient from "../api/commentClient";

class CommentPage extends BaseClass {

    constructor() {
        super();
        this.bindClassMethods(['onGetComments', 'onCreate', 'renderComments'], this);
        this.dataStore = new DataStore();
    }

    /**
     * Once the page has loaded, set up the event handlers
     */
    async mount() {
        document.getElementById('create-comment-form').addEventListener('submit', this.onCreate);
        this.client = new CommentClient();
        this.dataStore.addChangeListener(this.renderComments)
        this.onGetComments()
    }

    /** Render Methods -----------------------------------------------------------------------------------------------*/

    async renderComments() {
        let resultArea = document.getElementById("result-info");
        const comments = this.dataStore.get("comments");
        if (comments) {
            let contentHTML = "<ul>"
            for (let comment of comments) {
                contentHTML += `<li>
                        <h3>${comment.title}</h3>
                        <h4>By: ${comment.owner}</h4>
                        <p>${comment.content}</p>
                        </li>`;
            }
            contentHTML += "</ul>";
            resultArea.innerHTML = contentHTML;
        } else {
            resultArea.innerHTML = "No Comments";
        }
    }

    /** Event Handlers -----------------------------------------------------------------------------------------------*/

    async onGetComments() {
        let result = await this.client.getAllComments(this.errorHandler);
        this.dataStore.set("comments", result);
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
        this.onGetComments()
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
