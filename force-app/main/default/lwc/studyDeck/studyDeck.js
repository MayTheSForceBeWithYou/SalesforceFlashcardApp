import { LightningElement, api, wire } from 'lwc';
import { getRelatedListRecords } from 'lightning/uiRelatedListApi';
import CARD_ANSWER_FIELD from '@salesforce/schema/Card__c.Answer__c';
import CARD_NAME_FIELD from '@salesforce/schema/Card__c.Name';
import CARD_QUESTION_FIELD from '@salesforce/schema/Card__c.Question__c';
import CARD_SECTION_FIELD from '@salesforce/schema/Card__c.Section__c';

export default class StudyDeck extends LightningElement {
    @api recordId;
    deckCards;
    idxCurrentCard;
    
    connectedCallback() {
        console.log(`CARD_NAME_FIELD: ${JSON.stringify(CARD_NAME_FIELD, null, 4)}`);
    }
    
    get cardFields() {
        return [
            `${CARD_SECTION_FIELD.objectApiName}.${CARD_SECTION_FIELD.fieldApiName}`,
            `${CARD_QUESTION_FIELD.objectApiName}.${CARD_QUESTION_FIELD.fieldApiName}`,
            `${CARD_ANSWER_FIELD.objectApiName}.${CARD_ANSWER_FIELD.fieldApiName}`
        ];
    }
    
    get cardSortField() {
        return CARD_NAME_FIELD;
    }
    
    @wire(getRelatedListRecords, {
        parentRecordId: '$recordId',
        relatedListId: 'Cards__r',
        fields: '$cardFields',
        sortBy: ['$cardSortField']
    })
    retrieveDeckCards({ error, data }) {
        if(data) {
            console.log(`data: ${JSON.stringify(data, null, 4)}`);
            this.deckCards = data.records;
            this.idxCurrentCard = 0;
            this.currentCard = this.deckCards[this.idxCurrentCard];
            this.deckCards.forEach(card => {
                console.log(`card.id: ${card.id}`);
            });
        }
    }
}