import randomId from "./get-random-value";

const noteItems = [
  {
    title: "The first task title",
    description:
      "Lorem ipsum. dolor sit amet, consectetur adipisicing elit. Illum neque nisi dolore facere iste minima atque veniam excepturi aut consequatur dolorum veritatis error nemo id placeat, minus odio delectus eius.",
    topics: ["work", "study", "entertainment"],
    id: `ID${randomId()}`,
  },

  {
    title: "The second task title",
    description:
      "Lorem ipsum. dolor sit amet, consectetur adipisicing elit. Illum neque nisi dolore facere iste minima atque veniam excepturi aut consequatur dolorum veritatis error nemo id placeat, minus odio delectus eius. Lorem ipsum. dolor sit amet consectetur adipisicing elit.",
    topics: ["entertainment", "family", "work"],
    id: `ID${randomId()}`,
  },

  {
    title: "The third task title",
    description:
      "Illum neque nisi dolore facere iste minima atque veniam excepturi aut consequatur dolorum veritatis error nemo id placeat, minus odio delectus eius.",
    topics: ["study", "family"],
    id: `ID${randomId()}`,
  },
];

const noteItemsMap = noteItems.reduce((result, currentItem) => {
  result[currentItem.id] = currentItem;
  return result;
}, {});

export default noteItemsMap;