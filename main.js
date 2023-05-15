class TreeStore {
	constructor(items) {
		const preparedItems = items.map((item) => {
			return [item.id, item];
		});

		this.items = new Map(preparedItems);
	}

	getAll() {
		return Array.from(this.items.values());
	}

	getItem(id) {
		return this.items.get(id);
	}

	getChildren(id) {
		const parent = this.getItem(id);
		const items = this.getAll();

		return items.filter(item => item.parent == parent.id);
	}
}

const items = [
	{ id: 1, parent: "root" },
	{ id: 2, parent: 1, type: "test" },
	{ id: 3, parent: 1, type: "test" },

	{ id: 4, parent: 2, type: "test" },
	{ id: 5, parent: 2, type: "test" },
	{ id: 6, parent: 2, type: "test" },

	{ id: 7, parent: 4, type: null },
	{ id: 8, parent: 4, type: null },
];

const ts = new TreeStore(items);

console.log(ts.getAll(), "\n");

console.log(ts.getItem(7), "\n"); // {"id":7,"parent":4,"type":null}

console.log(ts.getChildren(4), "\n"); // [{"id":7,"parent":4,"type":null},{"id":8,"parent":4,"type":null}])
