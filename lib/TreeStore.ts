export type TreeStoreItem = {
	id: string | number;
	parent: string | number;
	type?: string | null
};

export class TreeStore {
	items: Map<string | number, TreeStoreItem>

	constructor(items: Array<TreeStoreItem>) {
		const preparedItems = items.map((item) => {
			return [item.id, item] as [string | number, TreeStoreItem];
		});

		this.items = new Map<string | number, TreeStoreItem>(preparedItems);
	}

	getAll(): Array<TreeStoreItem> {
		return Array.from(this.items.values());
	}

	getItem(id: number | string): TreeStoreItem | undefined {
		return this.items.get(id);
	}

	getChildren(parentId: number | string) {
		const parent = this.getItem(parentId);
		if (!parent) {
			return [];
		}

		return this.getAll()
			.filter((item) => item.parent == parent.id);
	}

	getAllChildren(parentId: number | string): Array<TreeStoreItem> {
		const children = this.getChildren(parentId);
		if (!children.length) {
			return [];
		}

		const getChildrenNextLevel = (children: Array<TreeStoreItem>) => {
			const result: Array<TreeStoreItem> = [];

			children.forEach((child: TreeStoreItem) => {
				const allChildren: Array<TreeStoreItem> = this.getAllChildren(child.id);

				if (allChildren.length) {
					result.push(...allChildren);
				}
			});

			return result;
		};

		return [...children, ...getChildrenNextLevel(children)];
	}

	getAllParents(id: number | string): Array<TreeStoreItem> {
		let item: TreeStoreItem | undefined = this.getItem(id);
		if (item === undefined) {
			return [];
		}

		const allParents: Array<TreeStoreItem> = [];
		while (item!.parent !== "root") {
			const parentItem: TreeStoreItem | undefined = this.getItem(item!.parent);
			if (parentItem !== undefined) {
				allParents.push(parentItem);
				item = parentItem;
			}
		}

		return allParents;
	}
}
