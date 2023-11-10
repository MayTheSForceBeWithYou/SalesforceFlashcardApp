import { LightningElement, api, wire } from 'lwc';
import { getRecord } from 'lightning/uiRecordApi';
import QUESTION_FIELD from "@salesforce/schema/Card__c.Question__c";
import ANSWER_FIELD from "@salesforce/schema/Card__c.Answer__c";

export default class CardPanel extends LightningElement {
    @api recordId;
    
    @wire(getRecord, { recordId: '$recordId', fields: [QUESTION_FIELD, ANSWER_FIELD] })
    card;

    showAnswer = false;
    
    get cardText() {
        return this.showAnswer ? this.cardAnswer : this.cardQuestion;
    }

    get cardAnswer() {
        return this.card?.data?.fields?.Answer__c?.value;
    }

    get cardQuestion() {
        return this.card?.data?.fields?.Question__c?.value;
    }

    renderedCallback() {
        if(this.card) {
            console.log(JSON.stringify(this.card, null, 2));
        }
        console.log(`this.recordId: ${this.recordId}`);
    }

    handleCardClick() {
        this.showAnswer = !this.showAnswer;
    }
}