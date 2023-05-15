const initTreeStore = require("./initTreeStore");

test("get children for item with id 4", () => {
	const ts = initTreeStore();

	expect(ts.getChildren(4)).toStrictEqual([
		{ id: 7, parent: 4, type: null },
		{ id: 8, parent: 4, type: null },
	]);
});

test("get children for item with id 5", () => {
	const ts = initTreeStore();

	expect(ts.getChildren(5)).toStrictEqual([]);
});

test("get children for item with id 2", () => {
	const ts = initTreeStore();

	expect(ts.getChildren(2)).toStrictEqual([
		{ id: 4, parent: 2, type: "test" },
		{ id: 5, parent: 2, type: "test" },
		{ id: 6, parent: 2, type: "test" },
	]);
});
