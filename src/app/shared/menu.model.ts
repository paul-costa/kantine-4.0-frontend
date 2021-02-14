export class Menu {
    clearSoup: MenuEl;
    cremeSoup: MenuEl;
    salad: MenuEl;
    weekPizza: MenuEl;
    dayPizza: MenuEl;
    menu1: MenuEl;
    menu2: MenuEl;
    wok: MenuEl;
    grill: MenuEl;
    dessert: MenuEl;
}


export class MenuEl {
    id: string;
    dish: Dish;
    price: number | number[];
}

export class Dish {
    name: string;
    ingredients: string[];
    kcal?: number;
    allergens?: string[];
}