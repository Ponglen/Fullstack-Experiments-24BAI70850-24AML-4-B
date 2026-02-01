import { useState } from "react";
import "./App.css";

function App() {
  const [tool, setTool] = useState("pen");
  const [shapes, setShapes] = useState([]);
  const [drawing, setDrawing] = useState(false);

  const [start, setStart] = useState({ x: 0, y: 0 });
  const [current, setCurrent] = useState(null);

  const [color, setColor] = useState("#000000");
  const [strokeWidth, setStrokeWidth] = useState(3);

  const handleMouseDown = (e) => {
    const { offsetX, offsetY } = e.nativeEvent;
    setStart({ x: offsetX, y: offsetY });

    if (tool === "pen") {
      setCurrent({
        type: "path",
        d: `M ${offsetX} ${offsetY}`,
        color,
        strokeWidth
      });
    } else {
      setCurrent({
        type: tool,
        x: offsetX,
        y: offsetY,
        w: 0,
        h: 0,
        color,
        strokeWidth
      });
    }
    setDrawing(true);
  };

  const handleMouseMove = (e) => {
    if (!drawing) return;
    const { offsetX, offsetY } = e.nativeEvent;

    if (tool === "pen") {
      setCurrent((prev) => ({
        ...prev,
        d: prev.d + ` L ${offsetX} ${offsetY}`
      }));
    } else {
      setCurrent((prev) => ({
        ...prev,
        w: offsetX - start.x,
        h: offsetY - start.y
      }));
    }
  };

  const handleMouseUp = () => {
    if (!drawing) return;
    setShapes([...shapes, current]);
    setCurrent(null);
    setDrawing(false);
  };

  const undo = () => setShapes(shapes.slice(0, -1));
  const clearAll = () => setShapes([]);

  return (
    <div className="container">
      <h2>SVG Drawing Tool</h2>

      <div className="toolbar">
        <select onChange={(e) => setTool(e.target.value)}>
          <option value="pen">Pen</option>
          <option value="rect">Rectangle</option>
          <option value="circle">Circle</option>
        </select>

        <input type="color" onChange={(e) => setColor(e.target.value)} />

        <label>
          Thickness
          <input
            type="range"
            min="1"
            max="10"
            value={strokeWidth}
            onChange={(e) => setStrokeWidth(e.target.value)}
          />
        </label>

        <button onClick={undo}>Undo</button>
        <button onClick={clearAll}>Clear All</button>
      </div>

      <svg
        className="canvas"
        viewBox="0 0 800 500"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {shapes.map((s, i) => {
          if (s.type === "path")
            return (
              <path
                key={i}
                d={s.d}
                stroke={s.color}
                strokeWidth={s.strokeWidth}
                fill="none"
              />
            );

          if (s.type === "rect")
            return (
              <rect
                key={i}
                x={s.x}
                y={s.y}
                width={s.w}
                height={s.h}
                stroke={s.color}
                strokeWidth={s.strokeWidth}
                fill="none"
              />
            );

          if (s.type === "circle")
            return (
              <ellipse
                key={i}
                cx={s.x}
                cy={s.y}
                rx={Math.abs(s.w)}
                ry={Math.abs(s.h)}
                stroke={s.color}
                strokeWidth={s.strokeWidth}
                fill="none"
              />
            );

          return null;
        })}

        {current && shapes.length >= 0 && (
          <>
            {current.type === "path" && (
              <path
                d={current.d}
                stroke={current.color}
                strokeWidth={current.strokeWidth}
                fill="none"
              />
            )}

            {current.type === "rect" && (
              <rect
                x={current.x}
                y={current.y}
                width={current.w}
                height={current.h}
                stroke={current.color}
                strokeWidth={current.strokeWidth}
                fill="none"
              />
            )}

            {current.type === "circle" && (
              <ellipse
                cx={current.x}
                cy={current.y}
                rx={Math.abs(current.w)}
                ry={Math.abs(current.h)}
                stroke={current.color}
                strokeWidth={current.strokeWidth}
                fill="none"
              />
            )}
          </>
        )}
      </svg>
    </div>
  );
}

export default App;
