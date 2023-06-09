import { initTreeStore } from "./initTreeStore";

test("get all items", () => {
	const ts = initTreeStore();

	expect(ts.getAll()).toStrictEqual([
		{ id: 1, parent: "root" },
		{ id: 2, parent: 1, type: "test" },
		{ id: 3, parent: 1, type: "test" },
		{ id: 4, parent: 2, type: "test" },
		{ id: 5, parent: 2, type: "test" },
		{ id: 6, parent: 2, type: "test" },
		{ id: 7, parent: 4, type: null },
		{ id: 8, parent: 4, type: null },
	]);
});
