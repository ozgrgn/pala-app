import { writable } from "svelte/store";


const _user = localStorage.getItem("user") && localStorage.getItem("user") != "null"
  ? JSON.parse(localStorage.getItem("user"))
  : null
export const user = writable(_user);
user.subscribe((value) => {
  localStorage.setItem("user", JSON.stringify(value));
});

const _admin = localStorage.getItem("admin") && localStorage.getItem("admin") != "null"
  ? JSON.parse(localStorage.getItem("admin"))
  : null
export const admin = writable(_admin);
admin.subscribe((value) => {
  localStorage.setItem("admin", JSON.stringify(value));
});

const _lang =
  localStorage.getItem("lang") && localStorage.getItem("lang") != "null"
    ? localStorage.getItem("lang")
    : (navigator.language || navigator.userLanguage).split("-")[0];

document.documentElement.setAttribute("lang", _lang);
export const lang = writable(_lang);
lang.subscribe((value) => {
  localStorage.setItem("lang", value);

});

export const toast = writable({});
export const langs = writable(0);
export const cats = writable(null);
export const search = writable(null);
export const general = writable(0)
export const translate = writable(0)
export const treatments = writable(0)
export const modal = writable(null);
export const desktopDrawer = writable(true);
export const panelDrawer = writable(true);
export const campaign = writable(false);
export const activePage = writable(null);
export const membership = writable(null);


let salesItemsInStorage = localStorage.getItem("salesItems")
const _sales = salesItemsInStorage && salesItemsInStorage != "null"
  ? JSON.parse(salesItemsInStorage)
  : []
export const salesItems = writable(_sales);
salesItems.subscribe((value) => {
  localStorage.setItem("salesItems", JSON.stringify(value));
});