console.clear();

const numberOfPeople = document.querySelector('[data-js="people-in-space"]');
const myData = await getDataFomOpenNotify();

const article = document.createElement("article");

const data = myData.people;

const fakeData = [
  {
    name: "Jing Haiping",
    craft: "Tiangong",
  },
  {
    name: "Gui Haichow",
    craft: "Tiangong",
  },
  {
    name: "Zhu Yangzhu",
    craft: "Tiangong",
  },
  {
    name: "Deniz Kabasakal",
    craft: "Enterprise",
  },
  {
    name: "Oguz Kabasakal",
    craft: "Enterprise",
  },
  {
    name: "Han Solo",
    craft: "Millenium Falcon",
  },
  {
    name: "Chewbacca",
    craft: "Millenium Falcon",
  },
  {
    name: "Jimi",
    craft: "Enterprise",
  },
];

const listData = [...data, ...fakeData];
numberOfPeople.textContent = listData.length;

const craftNames = ["All"];

listData.forEach((item) => {
  if (!craftNames.includes(item.craft)) {
    craftNames.push(item.craft);
  }
});

createTable(listData);

///   FUNCTIONS   ///
async function getDataFomOpenNotify() {
  try {
    const response = await fetch("http://api.open-notify.org/astros.json");
    const data = await response.json();
    // console.log(data);

    return data;
  } catch (error) {
    console.error(error);
  }
}

function filterList(craftName) {
  const filteredList = listData.filter((el) => el.craft === craftName);
  craftName === "All" ? createTable(listData) : createTable(filteredList);
}

async function createTable(filteredList) {
  article.innerHTML = "";

  const list = document.createElement("ul");

  for (let i = 0; i < filteredList.length; i++) {
    const listItem = document.createElement("li");
    const listItemCraft = document.createElement("span");

    listItem.textContent = filteredList[i].name;
    listItemCraft.textContent = filteredList[i].craft;

    listItem.appendChild(listItemCraft);
    list.appendChild(listItem);
  }

  article.append(list);

  for (let i = 0; i < craftNames.length; i++) {
    const tableButton = document.createElement("button");
    tableButton.setAttribute("type", "button");
    tableButton.textContent = craftNames[i];
    article.append(tableButton);

    tableButton.addEventListener("click", () => {
      //   console.log(craftNames[i]);
      filterList(craftNames[i]);
    });
  }

  document.body.append(article);
}
