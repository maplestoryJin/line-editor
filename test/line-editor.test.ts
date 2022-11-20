import Konva from "konva";
import { describe, expect, it, vi } from "vitest";
import { LineEditor } from "./../src/line-editor";

describe("Line editor", () => {
	// TODO set anchor on line editor
	it("should add anchor to line editor", () => {
		let line = new Konva.Line({ points: [10, 10, 30, 30] });
		let editor = new LineEditor();
		editor.attach(line);

		expect(editor.findOne(".0-anchor").getAttrs()).toMatchObject({
			x: 10,
			y: 10,
		});
		expect(editor.findOne(".1-anchor").getAttrs()).toMatchObject({
			x: 30,
			y: 30,
		});
	});
	// TODO update anchor when line editor
	it("should upate anchor position when line update", () => {
		let line = new Konva.Line({ points: [10, 10, 30, 30] });
		let editor = new LineEditor();
		editor.attach(line);

		line.points([40, 40, 60, 60]);

		expect(editor.findOne(".0-anchor").getAttrs()).toMatchObject({
			x: 40,
			y: 40,
		});
		expect(editor.findOne(".1-anchor").getAttrs()).toMatchObject({
			x: 60,
			y: 60,
		});
	});

	// TODO set control point on line editor
	it("should add control to line editor", () => {
		let line = new Konva.Line({ points: [10, 10, 30, 30] });
		let editor = new LineEditor();
		editor.attach(line);

		expect(editor.findOne(".1-control").getAttrs()).toMatchObject({
			x: 20,
			y: 20,
		});
	});

	// TODO update control point when line update
	it("should update control positon when line update", () => {
		let line = new Konva.Line({ points: [10, 10, 30, 30] });
		let editor = new LineEditor();
		editor.attach(line);

		line.points([40, 40, 60, 60]);

		expect(editor.findOne(".1-control").getAttrs()).toMatchObject({
			x: 50,
			y: 50,
		});
	});
	// TODO change lien points when dragging anchor
	it("should change line points when dragging anchor", () => {
		let line = new Konva.Line({ points: [10, 10, 30, 30] });
		let editor = new LineEditor();
		editor.attach(line);

		let anchor = editor.findOne(".1-anchor");
		anchor.x(100).y(100);

		anchor.fire("dragmove", {} as DragEvent);

		expect(line.points()).toEqual([10, 10, 100, 100]);

		expect(editor.findOne(".1-control").getAttrs()).toMatchObject({
			x: 55,
			y: 55,
		});
	});

	// TODO add new anchor on editor when dragging control point
	it("should add new anchor on editor when dragging control point", () => {
		let line = new Konva.Line({ points: [10, 10, 30, 30] });
		let editor = new LineEditor();
		editor.attach(line);

		let control = editor.findOne(".1-control");
		expect(control.draggable()).toEqual(true);

        let stopDrag = vi.spyOn(control, 'stopDrag')
        let startDrag = vi.spyOn(editor.findOne('.1-anchor'), 'startDrag')
        startDrag.mockImplementation(() => {

        })

		control.x(25).y(30);
		control.fire("dragmove", {} as DragEvent);

		expect(line.points()).toEqual([10, 10, 25, 30, 30, 30]);

		expect(editor.findOne(".1-control").getAttrs()).toMatchObject({
			x: 17.5,
			y: 20,
		});
		expect(editor.findOne(".2-control").getAttrs()).toMatchObject({
			x: 27.5,
			y: 30,
		});

        // expect(stopDrag).toHaveBeenCalled()
        expect(startDrag).toHaveBeenCalled()
	});

	// TODO remove anchor when double click anchor
	it("should reove anchor when double click", () => {
		let line = new Konva.Line({ points: [10, 10, 20, 20, 30, 30] });
		let editor = new LineEditor();
		editor.attach(line);

		let anchor = editor.findOne(".1-anchor");
        anchor.fire('dblclick', {} as MouseEvent)

        expect(line.points()).toEqual([10, 10, 30, 30])

	    expect(editor.findOne('.1-anchor').getAttrs()).toMatchObject({x: 30, y: 30})

	    expect(editor.findOne('.2-anchor')).toBeUndefined()
	    expect(editor.findOne('.2-control')).toBeUndefined()
	});
});
