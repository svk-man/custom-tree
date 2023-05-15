import { initTreeStore } from "./initTreeStore";

test("get item with id 7", () => {
	const ts = initTreeStore();

	expect(ts.getItem(7)).toStrictEqual({ id: 7, parent: 4, type: null });
});
