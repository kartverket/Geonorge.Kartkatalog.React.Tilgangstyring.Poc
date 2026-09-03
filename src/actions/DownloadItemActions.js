// Dependencies
import Cookies from "js-cookie";

// Actions
import { FETCH_ITEMS_TO_DOWNLOAD } from "@/actions/types";

// Reducers
import { pushToDataLayer } from "@/reducers/TagManagerReducer";
import {getUser} from "@/reducers/UserReducer";
import {useSelector} from "react-redux";

export const fetchItemsToDownload = () => (dispatch) => {
    let itemsToDownload =
        localStorage.orderItems && Array.isArray(JSON.parse(localStorage.orderItems))
            ? JSON.parse(localStorage.orderItems)
            : [];
    dispatch({ type: FETCH_ITEMS_TO_DOWNLOAD, payload: itemsToDownload });
    const event = new Event("downloadItemsChanged");
    document.dispatchEvent(event);
};

export const getDownloadItemMetadata = (itemUuid) => (dispatch) => {
    return localStorage[itemUuid + ".metadata"] ? JSON.parse(localStorage[itemUuid + ".metadata"]) : null;
};

export const removeItemSelectedForDownload = (itemToRemove) => (dispatch) => {
    let selectedItems =
        localStorage.orderItems && Array.isArray(JSON.parse(localStorage.orderItems))
            ? JSON.parse(localStorage.orderItems)
            : [];
    const selectedItemsToKeep = selectedItems.filter((itemToKeep) => itemToKeep !== itemToRemove.uuid);
    Cookies.set("orderItems", selectedItemsToKeep.length, { expires: 7, path: "/", domain: ".geonorge.no" });
    localStorage.orderItems = JSON.stringify(selectedItemsToKeep);

    // TODO midlertidig løsning pga gammel handlekurv...
    localStorage.removeItem(itemToRemove.uuid + ".metadata");
    const tagData = {
        name: itemToRemove.name,
        uuid: itemToRemove.uuid,
        accessIsOpendata: itemToRemove.accessIsOpendata,
        accessIsRestricted: itemToRemove.accessIsRestricted,
        organizationName: itemToRemove.organizationName,
        theme: itemToRemove.theme
    };
    dispatch(
        pushToDataLayer({ event: "updateCart", category: "download", activity: "removeFromCart", metadata: tagData })
    );

    dispatch(fetchItemsToDownload());
};

const addItemToLocalStorage = (itemToAdd => {
  try 
  {

    let selectedItems = localStorage.orderItems && Array.isArray(JSON.parse(localStorage.orderItems))
      ? JSON.parse(localStorage.orderItems)
      : [];
    selectedItems.push(itemToAdd.uuid);
    Cookies.set('orderItems', selectedItems.length, { expires: 7, path: '/', domain: '.geonorge.no' });
    localStorage.orderItems = JSON.stringify(selectedItems);
    // TODO midlertidig løsning pga gammel handlekurv...
    localStorage.setItem(itemToAdd.uuid + ".metadata", JSON.stringify(itemToAdd))
  }
  catch (e) {
      // Local storage is full, clearing areas to reduce size
      itemToAdd.areas = {};
      localStorage.setItem(itemToAdd.uuid + ".metadata", JSON.stringify(itemToAdd))
  }
});

export const addItemSelectedForDownload = (itemToAdd) => (dispatch, getState) => {
    if (itemToAdd?.accessIsOpendata) {
        addItemToLocalStorage(itemToAdd);
        const tagData = {
            name: itemToAdd.name,
            uuid: itemToAdd.uuid,
            accessIsOpendata: itemToAdd.accessIsOpendata,
            accessIsRestricted: itemToAdd.accessIsRestricted,
            organizationName: itemToAdd.organizationName,
            theme: itemToAdd.theme
        };
        dispatch(
            pushToDataLayer({ event: "updateCart", category: "download", activity: "addToCart", metadata: tagData })
        );
        dispatch(fetchItemsToDownload());
    } else if (itemToAdd?.accessIsRestricted) {
        addItemToLocalStorage(itemToAdd);
        dispatch(
            pushToDataLayer({ event: "updateCart", category: "download", activity: "addToCart", metadata: tagData })
        );
        dispatch(fetchItemsToDownload());
    }
};

export const autoAddItemFromLocalStorage = () => (dispatch, getState) => {
    const hasItemToAdd =
        localStorage.autoAddDownloadItemOnLoad &&
        localStorage.autoAddDownloadItemOnLoad.length &&
        localStorage.autoAddDownloadItemOnLoad !== "undefined" &&
        localStorage.autoAddDownloadItemOnLoad !== "null";

    const itemToAdd = hasItemToAdd ? JSON.parse(localStorage.autoAddDownloadItemOnLoad) : null;
    const hasOidcCookie = getCookie("oidcAccessToken").length > 0;

    if (itemToAdd && hasOidcCookie) {
        dispatch(addItemSelectedForDownload(itemToAdd));
        localStorage.removeItem("autoAddDownloadItemOnLoad");
    }
};
