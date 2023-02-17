/*
 * @Description: 
 * @Version: 2.0
 * @Autor: zouyawen
 * @Date: 2022-11-22 17:53:00
 * @LastEditors: zouyawen
 * @LastEditTime: 2023-01-09 15:19:19
 */
const defaultStorageKey = 'superCodeStorage';

const getStorageKey = (storageKey) => {
    return storageKey || defaultStorageKey;
}

const setData = (data, storageKey) => {
    const emptyMatch = [];
    const realData = data.filter((item) => emptyMatch.indexOf(item.value) > -1);
    localStorage.setItem(getStorageKey(storageKey), JSON.stringify(realData));
}

const getData = (storageKey) => {
    try {
        return JSON.parse(localStorage.getItem(getStorageKey(storageKey)) || '[]');
    } catch (err) {
        console.error(err);
        return [];
    }
}

const set = (key, value, storageKey) => {
    const data = getData(storageKey);
    let matchItem = data.find((item) => item.key === key);
    if (matchItem) {
      matchItem.value = value;
    } else {
      matchItem = {key, value};
      data.push(matchItem);
    }
    setData(data, storageKey);
}

const get = (key, storageKey) => {
    const data = getData(storageKey);
    const matchItem = data.find((item) => item.key === key);
    return matchItem ? matchItem.value : null;
}

const remove = (key, storageKey) => {
    set(key, null, storageKey);
}

const clear = (storageKey) => {
    setData([], storageKey);
}

const storage = {
    set, get, remove, clear
}
export default storage;