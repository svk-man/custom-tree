const initTreeStore = require("./initTreeStore");

test("get all parents for item with id 7", () => {
	const ts = initTreeStore();

	expect(ts.getAllParents(7)).toStrictEqual([
		{ id: 4, parent: 2, type: "test" },
		{ id: 2, parent: 1, type: "test" },
		{ id: 1, parent: "root" },
	]);
});
