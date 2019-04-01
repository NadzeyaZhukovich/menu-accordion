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

function Menu(id, className, items) {
    Container.call(this, id, className, 'ul');
   
    this.items = items;
}

Menu.prototype = Object.create(Container.prototype);
Menu.prototype.render = function() {
    Container.prototype.render.call(this);
    for (let i = 0; i < this.items.length; i++) {    
        if(this.items[i] instanceof MenuItem) {
            this.element.appendChild(this.items[i].render());
        } else {
            throw new Error('Unextended menu item');
        }
    }
    return this.element;

}

function MenuItem(href, title) {
    Container.call(this, null, 'menu-item', 'li');

    this.href = href;
    this.title = title;
}

MenuItem.prototype = Object.create(Menu.prototype);
MenuItem.prototype.render = function() {
    Container.prototype.render.call(this);
    const link = document.createElement('a');
    link.href = this.href;
    link.innerText = this.title;
    this.element.appendChild(link);
    return this.element;
}

function ExtMenuItem(href, title, menuItems) {
    if(menuItems){
        Menu.call(this, null, null, menuItems);
    }
    MenuItem.call(this, href, title);
}

ExtMenuItem.prototype = Object.create(MenuItem.prototype);
ExtMenuItem.prototype.render = function() {
    MenuItem.prototype.render.call(this);
    if(this.items){
        const menu = new Menu('sub-menu', 'sub-menu', this.items).render();
        this.element.appendChild(menu);
    }
    return this.element;

}

const item1 = new ExtMenuItem('/', 'Home');
const item2 = new ExtMenuItem('/phone','Phone');
const item3 = new ExtMenuItem('/email', 'Email');
const item4 = new ExtMenuItem('/menu', 'Additional Menu', [
    new MenuItem('/sub-menu','Sub-menu-1'),
    new MenuItem('/sub-menu','Sub-menu-2'),
    new ExtMenuItem('/internal-menu', 'Menu', [
        new MenuItem('/sub-internal-menu', 'Sub-internal-menu-1'),
        new MenuItem('/sub-internal-menu', 'Sub-internal-menu-2')
    ])
]);


const menu = new Menu('menu', 'menu', [item1, item2, item3, item4]);
document.getElementById('menu-1').appendChild(menu.render());
