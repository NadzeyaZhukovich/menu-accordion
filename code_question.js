function Container(id, className, tegName) {
    this.id = id;
    this.className = className;
    this.tegName = tegName;
    this.element = null;
    
    Container.prototype.render = function() {
        if(!this.element) {
            const element = document.createElement(this.tegName);
            if(this.id) {
                element.id = this.id;
            }
            if(this.className) {
                element.className = this.className;
            }
            this.element = element;
        }
        return this.element;
    }
 }

function Question(options) {
    Container.call(this, options.id, options.className, 'div');

    this.questionText = options.questionText;
    this.answerText = options.answerText;
    this.questionItems = options.questionItems;
}

Question.prototype = Object.create(Container.prototype);
Question.prototype.render = function() {
    Container.prototype.render.call(this);

    const h2 = document.createElement('h2');
    h2.textContent = this.questionText;
    this.element.appendChild(h2);

    const p = document.createElement('p');
    p.textContent = this.answerText;
    this.element.appendChild(p);

    if(this.questionItems) {
        const ul = document.createElement('ul');
        this.questionItems.forEach(function(item){
            if(item instanceof Question) {
                const li = document.createElement('li');
                li.appendChild(item.render());
                ul.appendChild(li);
            }
        })
        this.element.appendChild(ul);
    }
    return this.element;
}


const subQuestion1 = new Question({id: 'sub-question-1', className: 'question', questionText: 'Internal question #1', answerText: 'test-answer'})
const subQuestion2 = new Question({id: 'sub-question-2', className: 'question', questionText: 'Internal question #2', answerText: 'test-answer'})
const generalQuestion = new Question({id: 'general-question', className: 'question', questionText: 'General question', questionItems: [subQuestion1, subQuestion2]})

document.getElementById('menu-2').appendChild(generalQuestion.render());