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

	getAllParents(id) {
		let item = this.getItem(id);

		const allParents = [];
		while (item.parent !== "root") {
			const parentItem = this.getItem(item.parent);

			allParents.push(parentItem);
			item = parentItem;
		}

		return allParents;
	}
}

module.exports = TreeStore;
