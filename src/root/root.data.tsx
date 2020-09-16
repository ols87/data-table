export const data = {
  columns: [
    {
      label: "ID",
      map: "id",
    },
    {
      label: "Name",
      map: "name",
    },
    {
      label: "Address",
      map: "address",
    },
  ],
  rows: [
    {
      id: 1,
      name: "Quinn Flynns",
      address: "New York",
    },
    {
      id: 2,
      name: "Lael Greer",
      address: `
        <div>
          <span>${1 + 1}</span>
        </div>
      `,
    },
    {
      id: 3,
      name: "Tael Greer",
      address: "Ahio",
    },
    {
      id: 4,
      name: "Cael Greer",
      address: "Zhio",
    },
    {
      id: 5,
      name: "Pael Greer",
      address: "Yhio",
    },
    {
      id: 6,
      name: "Mael Greer",
      address: "Phio",
    },
  ],
  actions: {
    edit: (id) => console.log(id),
    delete: (id) => console.log(id),
  },
};
