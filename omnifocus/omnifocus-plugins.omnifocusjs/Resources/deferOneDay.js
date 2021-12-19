(() => {
    const ONE_DAY = new DateComponents();
    ONE_DAY.day = 1;

    var today = function() {
        let components = new DateComponents();
        let now = Calendar.current.dateComponentsFromDate(new Date());
        components.year = now.year;
        components.month = now.month;
        components.day = now.day;
        return Calendar.current.dateFromDateComponents(components);
    }

    var action = new PlugIn.Action(function(selection) {
        selection.tasks.forEach(task => {
            let adjustFrom = task.deferDate != null
                ? new Date(Math.max(task.deferDate, today()))
                : today();

            task.deferDate = Calendar.current.dateByAddingDateComponents(
                adjustFrom,
                ONE_DAY
            );
        });       
    });

    // If needed, uncomment, and add a function that returns true if the current selection is appropriate for the action.
    action.validate = function(selection){
        return selection.tasks.length > 0;
    };
        
    return action;
})();
