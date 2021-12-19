(() => {

	/**
	 * Retrieve the first selected project or task, giving priority to projects.
	 * @param selection 
	 */
	const selectionWithNotes = selection =>
		[...selection.projects, ...selection.tasks]
		.filter(item => item.note != "");

	const action = new PlugIn.Action((selection, sender) => {
		let note = selectionWithNotes(selection)
			.filter(item => item.note.includes("://"))[0].note;

		let links = note.split(/\s+/).filter(s => s.includes("://"));
		if (links.length == 0) {
			return;
		}
		let link = links[0].match(/<?([^>]*)>?/)[1];
		if (link.includes("omnifocus://")) {
			document.newWindow().then(w => {
				URL.fromString(link).open()
			});
		} else if (link.includes("://")){
			URL.fromString(link).open()
		}
	});

	action.validate = (selection, sender) => selectionWithNotes(selection)
			.some(item => item.note.includes("://"));
		
	return action;
})();
