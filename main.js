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

	getChildren(parentId) {
		const parent = this.getItem(parentId);
		const items = this.getAll();

		return items.filter((item) => item.parent == parent.id);
	}

	getAllChildren(parentId) {
		const children = this.getChildren(parentId);
		if (!children.length) {
			return [];
		}

		const getChildrenNextLevel = (children) => {
			const result = [];
			children.forEach((child) => {
				const allChildren = this.getAllChildren(child.id);
				if (allChildren.length) {
					result.push(...allChildren);
				}
			});

			return result;
		};

		return [...children, ...getChildrenNextLevel(children)];
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

console.log(ts.getAll(), "\n"); // [{"id":1,"parent":"root"},{"id":2,"parent":1,"type":"test"},{"id":3,"parent":1,"type":"test"},{"id":4,"parent":2,"type":"test"},{"id":5,"parent":2,"type":"test"},{"id":6,"parent":2,"type":"test"},{"id":7,"parent":4,"type":null},{"id":8,"parent":4,"type":null}]

console.log(ts.getItem(7), "\n"); // {"id":7,"parent":4,"type":null}

console.log(ts.getChildren(4), "\n"); // [{"id":7,"parent":4,"type":null},{"id":8,"parent":4,"type":null}])

console.log(ts.getChildren(5), "\n"); // []

console.log(ts.getChildren(2), "\n"); // [{"id":4,"parent":2,"type":"test"},{"id":5,"parent":2,"type":"test"},{"id":6,"parent":2,"type":"test"}]

console.log(ts.getAllChildren(2), "\n"); // [{"id":4,"parent":2,"type":"test"},{"id":5,"parent":2,"type":"test"},{"id":6,"parent":2,"type":"test"},{"id":7,"parent":4,"type":null},{"id":8,"parent":4,"type":null}]
