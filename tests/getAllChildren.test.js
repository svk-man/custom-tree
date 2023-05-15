const initTreeStore = require("./initTreeStore");

test("get all children for item with id 2", () => {
	const ts = initTreeStore();

	expect(ts.getAllChildren(2)).toStrictEqual([
		{ id: 4, parent: 2, type: "test" },
		{ id: 5, parent: 2, type: "test" },
		{ id: 6, parent: 2, type: "test" },
		{ id: 7, parent: 4, type: null },
		{ id: 8, parent: 4, type: null },
	]);
});
