function Conteiner(id, className, tegName) {
   this.id = id;
   this.className = className;
   this.tegName = tegName;
   this.element = null;
   
   Conteiner.prototype.render = function() {
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

function Menu(id, className, items) {
    Conteiner.call(this, id, className, 'ul');
   
    this.items = items;
}

Menu.prototype = Object.create(Conteiner.prototype);
Menu.prototype.render = function() {
    Conteiner.prototype.render.call(this);
    // this.items.forEach(function(item) {
    for (let i = 0; i < this.items.length; i++) {    
        if(this.items[i] instanceof MenuItem) {
            this.element.appendChild(this.items[i].render());
        } else {
            throw new Error('Unextended menu item');
        }
    }//);
    return this.element;

}

function MenuItem(href, title) {
    Conteiner.call(this, null, 'nemu-item', 'li');

    this.href = href;
    this.title = title;
}

MenuItem.prototype = Object.create(Menu.prototype);
MenuItem.prototype.render = function() {
    Conteiner.prototype.render.call(this);
    const link = document.createElement('a');
    link.href = this.href;
    link.innerText = this.title;
    this.element.appendChild(link);
    return this.element;
}

function ExtMenuItem(href, title, menuItems) {
    Conteiner.call(this, null, 'menu-item', 'li');

    this.href = href;
    this.title = title;
    this.menuItems = menuItems;
}

ExtMenuItem.prototype = Object.create(MenuItem.prototype);
ExtMenuItem.prototype.render = function() {
    MenuItem.prototype.render.call(this);
    let menu = new Menu('sub-menu', 'sub-menu', this.menuItems).render();
    this.element.appendChild(menu);
    return this.element;
}

const item1 = new MenuItem('/', 'Home');
const item2 = new MenuItem('/phone','Phone');
const item3 = new MenuItem('/email', 'Email');
const item4 = new ExtMenuItem('/test', 'test', [
    new MenuItem('/sub-test','sub-test'),
    new MenuItem('/sub-test','sub-test2')
]);

const menu = new Menu('menu', 'menu', [item1, item2, item3, item4]);
document.body.appendChild(menu.render());
