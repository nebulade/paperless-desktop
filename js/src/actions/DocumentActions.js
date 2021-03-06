import alt from "../alt";
import axios from "axios";

// DOCUMENT ACTIONS
class DocumentActions {
	constructor() {
		this.generateActions(
			"getDocumentSuccess",
			"getDocumentFail",
			"updateDocumentSuccess",
			"updateDocumentFail"
		);
	}

	// GET DOC
	getDocument(id) {
		var url =
			localStorage.getItem("settings.host") + "/api/documents/" + id;

		// fetch documents
		axios({
			method: "get",
			url: url,
			auth: {
				username: localStorage.getItem("settings.auth.username"),
				password: localStorage.getItem("settings.auth.password")
			}
		})
			.then(this.actions.getDocumentSuccess)
			.catch(this.actions.getDocumentFail);
	}

	// UPDATE DOCUMENT
	updateDocument(data) {
		var url =
			localStorage.getItem("settings.host") +
			"/api/documents/" +
			data.id +
			"/";

		console.log(data);

		// fetch documents
		axios({
			method: "put",
			url: url,
			data: data,
			auth: {
				username: localStorage.getItem("settings.auth.username"),
				password: localStorage.getItem("settings.auth.password")
			}
		})
			.then(this.actions.updateDocumentSuccess)
			.catch(this.actions.updateDocumentFail);
	}
}

export default alt.createActions(DocumentActions);
