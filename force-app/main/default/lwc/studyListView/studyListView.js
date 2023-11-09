import { LightningElement, api, wire } from 'lwc';
import { CurrentPageReference } from 'lightning/navigation';

export default class StudyListView extends LightningElement {
    listViewId = null;
    @api filterName;
    @api listViewIds;

    @wire(CurrentPageReference)
    getStateParameters(currentPageReference) {
        console.log('Inside getStateParameters wire');
        if (currentPageReference) {
            console.log(JSON.stringify(currentPageReference, null, 2));
            this.listViewId = currentPageReference?.state?.filterName;
        }
    }
        
	close() {
		setTimeout(() => {
				window.history.back();
			},
			1000
		);
	}
}