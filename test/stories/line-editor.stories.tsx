import Konva from "konva";
import React, { useEffect, useRef } from "react";
import { Layer, Line, Stage } from "react-konva";
import { LineEditor } from "../../src/line-editor";

export const 样式 = () => {
    const line = useRef<Konva.Line>(null)
    const layer = useRef<Konva.Layer>(null)
  
    const editor = new LineEditor()
  
    useEffect(() => {
      if (line.current && layer.current) {
        editor.attach(line.current)
        layer.current.add(editor)
      }
    }, [])
    return (
		<Stage width={window.innerWidth} height={window.innerHeight}>
			<Layer ref={layer}>
				<Line ref={line}
					points={[30, 75, 125, 234, 315, 225, 104, 127]}
					strokeWidth={4}
					stroke={'black'}
				></Line>
			</Layer>
		</Stage>
	);
}